/* ==========================================================
   Bitácora Digital — Lógica de la aplicación (modular)
   Estado + CRUD + navegación entre módulos.
   Persistencia exacta y consistente en LocalStorage.
   ========================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "bitacora_evidencias_v2";

  const UNITS = ["Unidad 1", "Unidad 2", "Unidad 3"];
  // Mapea cada unidad a su sufijo de clase cromática (semejanza visual)
  const UNIT_CLASS = { "Unidad 1": "u1", "Unidad 2": "u2", "Unidad 3": "u3" };

  // ---------- Estado ----------
  let evidences = loadEvidences();
  let currentFilter = "Todas";
  let editingId = null;
  let pendingDeleteId = null;

  // ---------- Referencias al DOM ----------
  const $ = (id) => document.getElementById(id);

  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");
  const sidebar = $("sidebar");
  const menuToggle = $("menu-toggle");

  const form = $("evidence-form");
  const inputTitle = $("input-title");
  const inputDescription = $("input-description");
  const inputUnit = $("input-unit");
  const btnSubmit = $("btn-submit");
  const formModal = $("form-modal");
  const formModalTitle = $("form-modal-title");

  const cardsContainer = $("cards-container");
  const emptyPortfolio = $("empty-portfolio");
  const resultsCount = $("results-count");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const confirmModal = $("confirm-modal");

  const toastContainer = $("toast-container");

  // ==========================================================
  //  PERSISTENCIA (LocalStorage)
  // ==========================================================
  function loadEvidences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveEvidences() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evidences));
  }

  // ==========================================================
  //  TOASTS — visibilidad del estado del sistema
  // ==========================================================
  function showToast(message, type = "success") {
    const icons = { success: "✅", info: "ℹ️", danger: "🗑️" };
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = `${icons[type] || ""} ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("leaving");
      toast.addEventListener("animationend", () => toast.remove());
    }, 3000);
  }

  // ==========================================================
  //  NAVEGACIÓN ENTRE MÓDULOS
  // ==========================================================
  function switchView(viewName) {
    views.forEach((v) => v.classList.toggle("hidden", v.id !== `view-${viewName}`));
    navItems.forEach((n) => n.classList.toggle("active", n.dataset.view === viewName));

    // Renderiza el módulo destino con datos frescos
    if (viewName === "dashboard") renderDashboard();
    if (viewName === "portfolio") renderPortfolio();
    if (viewName === "evaluation") renderEvaluation();

    sidebar.classList.remove("open"); // cierra el menú en móvil
  }

  // ==========================================================
  //  MÓDULO 1: DASHBOARD
  // ==========================================================
  function renderDashboard() {
    const counts = countByUnit();
    const total = evidences.length;

    // --- Tarjetas de métricas (proximidad: cada dato en su tarjeta) ---
    const statsGrid = $("stats-grid");
    statsGrid.innerHTML = "";

    statsGrid.appendChild(statCard("total", "Total de evidencias", total));
    UNITS.forEach((u) =>
      statsGrid.appendChild(statCard(UNIT_CLASS[u], u, counts[u]))
    );

    // --- Alertas del estado del sistema ---
    const alerts = $("alerts-container");
    alerts.innerHTML = "";

    if (total === 0) {
      alerts.appendChild(alertRow("warning", "⚠️", "No hay evidencias registradas. Comienza agregando tu primera entrega."));
    } else {
      alerts.appendChild(alertRow("success", "✅", `Portafolio activo con ${total} evidencia(s) almacenada(s) correctamente.`));
      UNITS.forEach((u) => {
        if (counts[u] === 0) {
          alerts.appendChild(alertRow("warning", "📌", `La ${u} aún no tiene evidencias. Recuerda completarla.`));
        }
      });
    }
    alerts.appendChild(alertRow("info", "💾", "Los datos se guardan automáticamente en este navegador (LocalStorage)."));

    // --- Barras de distribución ---
    const bars = $("distribution-bars");
    bars.innerHTML = "";
    const max = Math.max(1, ...UNITS.map((u) => counts[u]));

    UNITS.forEach((u) => {
      const pct = (counts[u] / max) * 100;
      const row = document.createElement("div");
      row.className = "dist-row";
      row.innerHTML = `
        <span class="dist-label">${u}</span>
        <div class="dist-track">
          <div class="dist-fill ${UNIT_CLASS[u]}" style="width:${pct}%"></div>
        </div>
        <span class="dist-count">${counts[u]}</span>`;
      bars.appendChild(row);
    });
  }

  function statCard(cls, label, value) {
    const card = document.createElement("div");
    card.className = `stat-card ${cls}`;
    card.innerHTML = `
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>`;
    return card;
  }

  function alertRow(type, icon, text) {
    const el = document.createElement("div");
    el.className = `alert alert-${type}`;
    el.innerHTML = `<span>${icon}</span><span>${text}</span>`;
    return el;
  }

  // ==========================================================
  //  MÓDULO 2: PORTAFOLIO POR UNIDADES
  // ==========================================================
  function renderPortfolio() {
    const visible =
      currentFilter === "Todas"
        ? evidences
        : evidences.filter((e) => e.unit === currentFilter);

    cardsContainer.innerHTML = "";
    resultsCount.textContent =
      visible.length === 1
        ? "1 evidencia encontrada"
        : `${visible.length} evidencias encontradas`;

    emptyPortfolio.classList.toggle("hidden", visible.length > 0);

    visible.forEach((e) => cardsContainer.appendChild(createCard(e)));
  }

  function createCard(evidence) {
    const cls = UNIT_CLASS[evidence.unit] || "u1";

    // Proximidad: todo el contenido de la evidencia dentro de una tarjeta
    const card = document.createElement("article");
    card.className = "evidence-card";

    const badge = document.createElement("span");
    badge.className = `card-unit-badge ${cls}`;
    badge.textContent = evidence.unit;

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = evidence.title;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = evidence.description;

    const date = document.createElement("span");
    date.className = "card-date";
    date.textContent = `📅 ${evidence.createdAt}`;

    // Proximidad: acciones agrupadas al pie de la misma tarjeta
    const actions = document.createElement("div");
    actions.className = "card-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-primary btn-sm";   // Semejanza: afirmativa = primario
    btnEdit.textContent = "✏️ Editar";
    btnEdit.addEventListener("click", () => openForm(evidence.id));

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";  // Color semántico: destructiva = rojo
    btnDelete.textContent = "🗑️ Eliminar";
    btnDelete.addEventListener("click", () => requestDelete(evidence.id));

    actions.append(btnEdit, btnDelete);
    card.append(badge, title, description, date, actions);
    return card;
  }

  // ==========================================================
  //  MÓDULO 3: VISTA DE EVALUACIÓN (PROFESOR)
  // ==========================================================
  function renderEvaluation() {
    const container = $("evaluation-container");
    const empty = $("empty-evaluation");
    container.innerHTML = "";

    if (evidences.length === 0) {
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    // Salida organizada y escaneable: agrupada por unidad
    UNITS.forEach((unit) => {
      const items = evidences.filter((e) => e.unit === unit);
      if (items.length === 0) return;

      const group = document.createElement("div");
      group.className = "eval-group";

      const heading = document.createElement("h2");
      heading.className = "eval-group-title";
      heading.innerHTML = `${unit} <span class="count-pill">${items.length} entrega(s)</span>`;

      const table = document.createElement("table");
      table.className = "eval-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th style="width:28%">Título</th>
            <th>Descripción</th>
            <th style="width:130px">Fecha</th>
          </tr>
        </thead>
        <tbody></tbody>`;

      const tbody = table.querySelector("tbody");
      items.forEach((e) => {
        const tr = document.createElement("tr");
        const tdT = document.createElement("td");
        tdT.className = "eval-title";
        tdT.textContent = e.title;
        const tdD = document.createElement("td");
        tdD.className = "eval-desc";
        tdD.textContent = e.description;
        const tdF = document.createElement("td");
        tdF.textContent = e.createdAt;
        tr.append(tdT, tdD, tdF);
        tbody.appendChild(tr);
      });

      group.append(heading, table);
      container.appendChild(group);
    });
  }

  // ==========================================================
  //  UTILIDAD: conteo por unidad
  // ==========================================================
  function countByUnit() {
    const counts = { "Unidad 1": 0, "Unidad 2": 0, "Unidad 3": 0 };
    evidences.forEach((e) => {
      if (counts[e.unit] !== undefined) counts[e.unit]++;
    });
    return counts;
  }

  // ==========================================================
  //  FORMULARIO — Crear / Editar (dentro de modal)
  // ==========================================================
  function openForm(id = null) {
    editingId = id;
    clearErrors();

    if (id !== null) {
      const evidence = evidences.find((e) => e.id === id);
      if (!evidence) return;
      inputTitle.value = evidence.title;
      inputDescription.value = evidence.description;
      inputUnit.value = evidence.unit;
      formModalTitle.textContent = "✏️ Editar evidencia";
      btnSubmit.textContent = "Guardar cambios";
    } else {
      form.reset();
      formModalTitle.textContent = "➕ Registrar nueva evidencia";
      btnSubmit.textContent = "Agregar evidencia";
    }

    formModal.classList.remove("hidden");
    inputTitle.focus();
  }

  function closeForm() {
    formModal.classList.add("hidden");
    editingId = null;
    form.reset();
    clearErrors();
  }

  function clearErrors() {
    ["title", "description", "unit"].forEach((f) => setFieldError(f, ""));
  }

  function setFieldError(field, message) {
    $(`error-${field}`).textContent = message;
    $(`input-${field}`).closest(".form-group").classList.toggle("has-error", Boolean(message));
  }

  function validateForm() {
    let valid = true;
    if (!inputTitle.value.trim()) { setFieldError("title", "El título es obligatorio."); valid = false; }
    else setFieldError("title", "");

    if (!inputDescription.value.trim()) { setFieldError("description", "La descripción es obligatoria."); valid = false; }
    else setFieldError("description", "");

    if (!inputUnit.value) { setFieldError("unit", "Selecciona una unidad."); valid = false; }
    else setFieldError("unit", "");

    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    const data = {
      title: inputTitle.value.trim(),
      description: inputDescription.value.trim(),
      unit: inputUnit.value,
    };

    if (editingId !== null) {
      // UPDATE
      const evidence = evidences.find((e) => e.id === editingId);
      Object.assign(evidence, data);
      showToast("Evidencia actualizada con éxito.", "info");
    } else {
      // CREATE
      evidences.unshift({
        id: Date.now(),
        ...data,
        createdAt: formatDate(new Date()),
      });
      showToast("Evidencia guardada con éxito.", "success");
    }

    saveEvidences();
    closeForm();
    refreshCurrentView();
  }

  function formatDate(d) {
    return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
  }

  // ==========================================================
  //  ELIMINAR — con modal de confirmación (prevención de errores)
  // ==========================================================
  function requestDelete(id) {
    pendingDeleteId = id;
    confirmModal.classList.remove("hidden");
    $("btn-modal-cancel").focus(); // foco en la opción segura
  }

  function confirmDelete() {
    if (pendingDeleteId === null) return;
    evidences = evidences.filter((e) => e.id !== pendingDeleteId);
    pendingDeleteId = null;
    saveEvidences();
    closeConfirm();
    refreshCurrentView();
    showToast("Evidencia eliminada.", "danger");
  }

  function closeConfirm() {
    confirmModal.classList.add("hidden");
    pendingDeleteId = null;
  }

  // Vuelve a renderizar el módulo actualmente visible
  function refreshCurrentView() {
    const active = document.querySelector(".nav-item.active");
    if (active) switchView(active.dataset.view);
  }

  // ==========================================================
  //  FILTRO POR UNIDADES
  // ==========================================================
  function handleFilterClick(event) {
    currentFilter = event.currentTarget.dataset.unit;
    filterButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.unit === currentFilter)
    );
    renderPortfolio();
  }

  // ==========================================================
  //  REGISTRO DE EVENTOS
  // ==========================================================
  navItems.forEach((n) => n.addEventListener("click", () => switchView(n.dataset.view)));
  filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));

  $("btn-new-evidence").addEventListener("click", () => openForm());
  $("btn-cancel-form").addEventListener("click", closeForm);
  form.addEventListener("submit", handleSubmit);

  $("btn-modal-cancel").addEventListener("click", closeConfirm);
  $("btn-modal-confirm").addEventListener("click", confirmDelete);

  menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  // Cerrar modales con clic fuera o Escape (control y libertad del usuario)
  formModal.addEventListener("click", (e) => { if (e.target === formModal) closeForm(); });
  confirmModal.addEventListener("click", (e) => { if (e.target === confirmModal) closeConfirm(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!confirmModal.classList.contains("hidden")) closeConfirm();
    else if (!formModal.classList.contains("hidden")) closeForm();
  });

  // ==========================================================
  //  DATOS DE EJEMPLO — solo en el primer uso
  // ==========================================================
  if (localStorage.getItem(STORAGE_KEY) === null) {
    evidences = [
      { id: 1, title: "Mapa conceptual de heurísticas de Nielsen", description: "Resumen de las 10 heurísticas de usabilidad con ejemplos en apps móviles.", unit: "Unidad 1", createdAt: "01 jul. 2026" },
      { id: 2, title: "Informe de Card Sorting", description: "Resultados de la sesión de card sorting abierto con 8 participantes.", unit: "Unidad 2", createdAt: "03 jul. 2026" },
      { id: 3, title: "Prototipo de baja fidelidad", description: "Wireframes en papel de la pantalla principal con anotaciones de feedback.", unit: "Unidad 3", createdAt: "05 jul. 2026" },
      { id: 4, title: "Test de usabilidad moderado", description: "Guion y hallazgos de 5 pruebas con usuarios sobre el flujo de registro.", unit: "Unidad 1", createdAt: "06 jul. 2026" },
    ];
    saveEvidences();
  }

  // ==========================================================
  //  ARRANQUE
  // ==========================================================
  switchView("dashboard");
})();
