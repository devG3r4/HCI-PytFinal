/* ==========================================================
   Bitácora Digital — Lógica de la aplicación (modular)
   Estado + CRUD + navegación entre módulos.
   Persistencia exacta y consistente en LocalStorage.
   ========================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "bitacora_evidencias_v2";
  const THEME_KEY = "bitacora_theme";

  // ---------- Configuración de Cloudinary (subida no firmada) ----------
  const CLOUD_NAME = "aeyvrrn4";
  const UPLOAD_PRESET = "mi_preset";
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"];
  const ONEDRIVE_CONFIG = window.BITACORA_ONEDRIVE_CONFIG || {
    clientId: "",
    tenantId: "common",
  };

  const UNITS = ["Talleres", "Laboratorios", "Parciales", "Proyectos"];
  // Mantiene compatibilidad con evidencias creadas en la versión anterior.
  const LEGACY_UNIT_MAP = {
    "Unidad 1": "Talleres",
    "Unidad 2": "Laboratorios",
    "Unidad 3": "Parciales",
  };
  // Mapea cada categoría a su sufijo de clase cromática.
  const UNIT_CLASS = {
    Talleres: "u1",
    Laboratorios: "u2",
    Parciales: "u3",
    Proyectos: "u4",
  };

  // ---------- Estado ----------
  let evidences = [];
  let currentFilter = "Todas";
  let searchQuery = "";
  let selectedEvidenceId = null;
  let editingId = null;
  let pendingDeleteId = null;

  // ---------- Referencias al DOM ----------
  const $ = (id) => document.getElementById(id);

  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");
  const sidebar = $("sidebar");
  const menuToggle = $("menu-toggle");
  const topbarContextTitle = $("topbar-context-title");
  const navFileCount = $("nav-file-count");
  const searchInput = $("global-search");
  const themeToggle = $("theme-toggle");
  const themeIcon = $("theme-icon");

  const form = $("evidence-form");
  const inputTitle = $("input-title");
  const inputDescription = $("input-description");
  const inputUnit = $("input-unit");
  const inputFile = $("input-file");
  const currentFileHint = $("current-file-hint");
  const btnSubmit = $("btn-submit");
  const formModal = $("form-modal");
  const formModalTitle = $("form-modal-title");
  const quickUploadInput = $("quick-upload-input");
  const uploadDropzone = $("upload-dropzone");

  const cardsContainer = $("cards-container");
  const emptyPortfolio = $("empty-portfolio");
  const resultsCount = $("results-count");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const confirmModal = $("confirm-modal");

  const toastContainer = $("toast-container");

  const viewTitles = {
    dashboard: "Overview",
    portfolio: "Todos los archivos",
    evaluation: "Evaluación",
  };

  // ==========================================================
  //  SINCRONIZACIÓN EN TIEMPO REAL (Firebase)
  // ==========================================================
  const firebaseConfig = {
    apiKey: "AIzaSyBi_v2l11vhBt1mhCfFc12jMlkhGaEIYYc",
    authDomain: "portafolio-hci.firebaseapp.com",
    databaseURL: "https://portafolio-hci-default-rtdb.firebaseio.com",
    projectId: "portafolio-hci",
    storageBucket: "portafolio-hci.firebasestorage.app",
    messagingSenderId: "703227404068",
    appId: "1:703227404068:web:58f25326fecf9aa69e9db1"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  db.ref("evidencias").on("value", (snapshot) => {
    const data = snapshot.val();
    evidences = [];
    if (data) {
      Object.keys(data).forEach((key) => {
        evidences.push({ id: key, ...data[key] });
      });
      // Ordenar por ID (que ahora son timestamps o strings)
      evidences.sort((a, b) => {
        const idA = isNaN(a.id) ? 0 : Number(a.id);
        const idB = isNaN(b.id) ? 0 : Number(b.id);
        return idB - idA;
      });
    }
    refreshCurrentView();
  });

  // ==========================================================
  //  ARCHIVOS ADJUNTOS (Cloudinary)
  //  Se sube el archivo a Cloudinary y solo la URL resultante
  //  se guarda en localStorage junto con la evidencia, evitando
  //  el límite de tamaño de localStorage.
  // ==========================================================
  async function subirArchivoCloudinary(file) {
    const extension = file.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["pdf", "png", "jpg", "jpeg"];
    if (!ALLOWED_FILE_TYPES.includes(file.type) && !allowedExtensions.includes(extension)) {
      throw new Error("Tipo de archivo no permitido. Usa PDF, PNG o JPG.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("El archivo supera el límite de 10 MB.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData, signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Error de red o de configuración al subir el archivo.");
      }

      const data = await response.json();
      if (!data.secure_url) {
        throw new Error("Cloudinary no devolvió una URL válida.");
      }
      return { url: data.secure_url, name: file.name };
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("La subida tardó demasiado. Inténtalo de nuevo.");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
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
    navItems.forEach((n) => {
      const active = n.dataset.view === viewName;
      n.classList.toggle("active", active);
      if (active) n.setAttribute("aria-current", "page");
      else n.removeAttribute("aria-current");
    });
    if (topbarContextTitle) topbarContextTitle.textContent = viewTitles[viewName] || viewName;

    // Renderiza el módulo destino con datos frescos
    if (viewName === "dashboard") renderDashboard();
    if (viewName === "portfolio") renderPortfolio();
    if (viewName === "evaluation") renderEvaluation();

    sidebar.classList.remove("open"); // cierra el menú en móvil
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }

  // ==========================================================
  //  MÓDULO 1: DASHBOARD
  // ==========================================================
  function renderDashboard() {
    const counts = countByUnit();
    const total = evidences.length;
    if (navFileCount) navFileCount.textContent = total;
    const subtitle = $("dashboard-subtitle");
    if (subtitle) {
      subtitle.textContent = total
        ? `${total} evidencia(s) en tu workspace. Arrastra otra aquí o crea una nueva para continuar.`
        : "Arrastra una evidencia aquí o crea una nueva para comenzar.";
    }

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
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const visible = evidences.filter((e) => {
      const matchesUnit = currentFilter === "Todas" || e.unit === currentFilter;
      const haystack = [e.title, e.description, e.unit, e.fileName].filter(Boolean).join(" ").toLowerCase();
      return matchesUnit && (!normalizedQuery || haystack.includes(normalizedQuery));
    });

    cardsContainer.innerHTML = "";
    resultsCount.textContent =
      visible.length === 1
        ? "1 evidencia encontrada"
        : `${visible.length} evidencias encontradas`;

    emptyPortfolio.classList.toggle("hidden", visible.length > 0);

    visible.forEach((e) => cardsContainer.appendChild(createCard(e)));
    if (selectedEvidenceId !== null && !visible.some((e) => e.id === selectedEvidenceId)) {
      selectedEvidenceId = null;
    }
    updateSelectionUi();
  }

  function createCard(evidence) {
    const cls = UNIT_CLASS[evidence.unit] || "u1";

    // Proximidad: todo el contenido de la evidencia dentro de una tarjeta
    const card = document.createElement("article");
    card.className = `evidence-card${selectedEvidenceId === evidence.id ? " selected" : ""}`;
    card.tabIndex = 0;
    card.setAttribute("aria-selected", selectedEvidenceId === evidence.id ? "true" : "false");
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      selectEvidence(evidence.id);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectEvidence(evidence.id);
      }
    });

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

    card.append(badge, title, description, date);

    if (evidence.fileUrl) {
      const fileLink = document.createElement("a");
      fileLink.className = "card-file-link";
      fileLink.href = evidence.fileUrl;
      fileLink.target = "_blank";
      fileLink.rel = "noopener noreferrer";
      fileLink.textContent = `📎 ${evidence.fileName || "Ver archivo adjunto"}`;
      card.appendChild(fileLink);
    }

    // Proximidad: acciones agrupadas al pie de la misma tarjeta
    const actions = document.createElement("div");
    actions.className = "card-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-primary btn-sm";   // Semejanza: afirmativa = primario
    btnEdit.type = "button";
    btnEdit.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-edit"></use></svg><span>Editar</span>`;
    btnEdit.addEventListener("click", () => openForm(evidence.id));

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";  // Color semántico: destructiva = rojo
    btnDelete.type = "button";
    btnDelete.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg><span>Eliminar</span>`;
    btnDelete.addEventListener("click", () => requestDelete(evidence.id));

    actions.append(btnEdit, btnDelete);
    card.appendChild(actions);
    return card;
  }

  function selectEvidence(id) {
    selectedEvidenceId = selectedEvidenceId === id ? null : id;
    renderPortfolio();
  }

  function getSelectedEvidence() {
    return evidences.find((e) => e.id === selectedEvidenceId) || null;
  }

  function updateSelectionUi() {
    const selected = getSelectedEvidence();
    const summary = $("selection-summary");
    if (summary) {
      summary.textContent = selected
        ? `Seleccionada: ${selected.title}`
        : "Selecciona una evidencia para ver acciones.";
    }

    ["action-download", "action-delete", "action-rename", "action-move", "action-copy"].forEach((id) => {
      const button = $(id);
      if (button) button.disabled = !selected;
    });
  }

  function handleSelectedAction(action) {
    const selected = getSelectedEvidence();
    if (!selected) {
      showToast("Selecciona una evidencia primero.", "info");
      return;
    }

    if (action === "download") {
      if (!selected.fileUrl) {
        showToast("Esta evidencia no tiene un archivo adjunto.", "info");
        return;
      }
      window.open(selected.fileUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (action === "delete") {
      requestDelete(selected.id);
      return;
    }
    if (action === "rename") {
      openForm(selected.id);
      return;
    }
    const actionNames = { move: "Mover", copy: "Copiar" };
    showToast(`${actionNames[action]} estará disponible en una próxima versión.`, "info");
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

    // Salida organizada y escaneable: agrupada por tipo de evidencia.
    UNITS.forEach((category) => {
      const items = evidences.filter((e) => e.unit === category);
      if (items.length === 0) return;

      const group = document.createElement("div");
      group.className = "eval-group";

      const heading = document.createElement("h2");
      heading.className = "eval-group-title";
      heading.innerHTML = `${category} <span class="count-pill">${items.length} entrega(s)</span>`;

      const table = document.createElement("table");
      table.className = "eval-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th style="width:26%">Título</th>
            <th>Descripción</th>
            <th style="width:120px">Fecha</th>
            <th style="width:110px">Archivo</th>
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
        const tdFile = document.createElement("td");
        if (e.fileUrl) {
          const link = document.createElement("a");
          link.href = e.fileUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "📎 Ver";
          tdFile.appendChild(link);
        } else {
          tdFile.textContent = "—";
        }
        tr.append(tdT, tdD, tdF, tdFile);
        tbody.appendChild(tr);
      });

      group.append(heading, table);
      container.appendChild(group);
    });
  }

  // ==========================================================
  //  UTILIDAD: conteo por categoría
  // ==========================================================
  function countByUnit() {
    const counts = Object.fromEntries(UNITS.map((category) => [category, 0]));
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
      inputFile.value = "";
      currentFileHint.textContent = evidence.fileUrl
        ? `📎 Archivo actual: ${evidence.fileName || "ver adjunto"} (elige uno nuevo para reemplazarlo)`
        : "";
      formModalTitle.textContent = "✏️ Editar evidencia";
      btnSubmit.textContent = "Guardar cambios";
    } else {
      form.reset();
      currentFileHint.textContent = "";
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
    currentFileHint.textContent = "";
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

    if (!inputUnit.value) { setFieldError("unit", "Selecciona una categoría."); valid = false; }
    else setFieldError("unit", "");

    return valid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    const data = {
      title: inputTitle.value.trim(),
      description: inputDescription.value.trim(),
      unit: inputUnit.value,
    };

    const file = inputFile.files[0];
    const originalBtnText = btnSubmit.textContent;
    let uploadErrorMessage = "";

    // Si se eligió un archivo, subirlo primero a Cloudinary
    if (file) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = "⏳ Subiendo archivo…";
      try {
        const { url, name } = await subirArchivoCloudinary(file);
        data.fileUrl = url;
        data.fileName = name;
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        uploadErrorMessage = error.message || "No se pudo subir el archivo.";
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = originalBtnText;
      }
    }

    if (editingId !== null) {
      // UPDATE
      db.ref("evidencias/" + editingId).update(data);
      showToast("Evidencia actualizada con éxito.", "info");
    } else {
      // CREATE
      const newId = Date.now();
      const newEvidence = {
        id: newId,
        ...data,
        createdAt: formatDate(new Date()),
      };
      db.ref("evidencias/" + newId).set(newEvidence);
      showToast("Evidencia guardada con éxito.", "success");
    }

    closeForm();
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
    db.ref("evidencias/" + pendingDeleteId).remove();
    if (selectedEvidenceId === pendingDeleteId) selectedEvidenceId = null;
    pendingDeleteId = null;
    closeConfirm();
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
  //  TEMA, BÚSQUEDA Y CARGA RÁPIDA
  // ==========================================================
  function setTheme(theme) {
    const light = theme === "light";
    document.body.classList.toggle("legacy-light-theme", light);
    try {
      localStorage.setItem(THEME_KEY, light ? "light" : "dark");
    } catch {
      // El tema sigue funcionando aunque el navegador bloquee LocalStorage.
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", light ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
      themeToggle.title = light ? "Cambiar a tema oscuro" : "Cambiar a tema claro";
    }
    if (themeIcon) themeIcon.setAttribute("href", light ? "#icon-moon" : "#icon-sun");
  }

  function loadTheme() {
    let savedTheme = "dark";
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    } catch {
      // Usa el tema oscuro por defecto.
    }
    setTheme(savedTheme === "light" ? "light" : "dark");
  }

  function assignFileToForm(file) {
    if (!file) return;
    openForm();
    try {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      inputFile.files = transfer.files;
    } catch {
      // Algunos navegadores no permiten asignar FileList; el usuario aún
      // puede seleccionar el archivo manualmente en el formulario.
    }
    currentFileHint.textContent = `📎 ${file.name} listo para subir`;
  }

  function handleQuickUpload(file) {
    if (!file) return;
    assignFileToForm(file);
  }

  function setupDropzone() {
    if (!uploadDropzone) return;
    ["dragenter", "dragover"].forEach((eventName) => {
      uploadDropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        uploadDropzone.classList.add("is-dragging");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      uploadDropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        uploadDropzone.classList.remove("is-dragging");
      });
    });
    uploadDropzone.addEventListener("drop", (event) => {
      handleQuickUpload(event.dataTransfer && event.dataTransfer.files[0]);
    });
    uploadDropzone.addEventListener("click", () => quickUploadInput.click());
    uploadDropzone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        quickUploadInput.click();
      }
    });
  }

  function setupSidebarSections() {
    document.querySelectorAll(".section-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (link.dataset.unit) {
          currentFilter = link.dataset.unit;
          filterButtons.forEach((btn) =>
            btn.classList.toggle("active", btn.dataset.unit === currentFilter)
          );
        }
        switchView(link.dataset.view);
      });
    });
  }

  // ==========================================================
  //  REGISTRO DE EVENTOS
  // ==========================================================
  navItems.forEach((n) => n.addEventListener("click", () => switchView(n.dataset.view)));
  filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));

  $("btn-new-evidence").addEventListener("click", () => openForm());
  $("btn-cancel-form").addEventListener("click", closeForm);
  $("btn-form-cancel-secondary").addEventListener("click", closeForm);
  $("btn-portfolio-new").addEventListener("click", () => openForm());
  form.addEventListener("submit", handleSubmit);

  $("btn-modal-cancel").addEventListener("click", closeConfirm);
  $("btn-modal-confirm").addEventListener("click", confirmDelete);

  menuToggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  $("btn-dashboard-upload").addEventListener("click", () => quickUploadInput.click());
  quickUploadInput.addEventListener("click", (event) => event.stopPropagation());
  quickUploadInput.addEventListener("change", () => {
    handleQuickUpload(quickUploadInput.files[0]);
    quickUploadInput.value = "";
  });
  $("btn-create-folder").addEventListener("click", () => showToast("Las carpetas estarán disponibles próximamente.", "info"));
  $("btn-import-onedrive").addEventListener("click", () => {
    if (!ONEDRIVE_CONFIG.clientId) {
      showToast("OneDrive está seleccionado. Falta configurar el clientId de Microsoft Entra.", "info");
      return;
    }
    showToast("La conexión con OneDrive está lista para configurarse con Microsoft Graph.", "info");
  });
  $("btn-invite").addEventListener("click", () => showToast("La invitación de miembros estará disponible próximamente.", "info"));
  $("workspace-switcher").addEventListener("click", () => showToast("Solo tienes un workspace configurado.", "info"));
  $("btn-profile").addEventListener("click", () => showToast("Perfil de devG3r4", "info"));

  [
    ["action-download", "download"],
    ["action-delete", "delete"],
    ["action-rename", "rename"],
    ["action-move", "move"],
    ["action-copy", "copy"],
  ].forEach(([id, action]) => {
    $(id).addEventListener("click", () => handleSelectedAction(action));
  });

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    const portfolioVisible = !$("view-portfolio").classList.contains("hidden");
    if (portfolioVisible) renderPortfolio();
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && $("view-portfolio").classList.contains("hidden")) {
      switchView("portfolio");
      renderPortfolio();
    }
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
    }
  });
  themeToggle.addEventListener("click", () => {
    setTheme(document.body.classList.contains("legacy-light-theme") ? "dark" : "light");
  });
  setupDropzone();
  setupSidebarSections();
  loadTheme();

  // Cerrar modales con clic fuera o Escape (control y libertad del usuario)
  formModal.addEventListener("click", (e) => { if (e.target === formModal) closeForm(); });
  confirmModal.addEventListener("click", (e) => { if (e.target === confirmModal) closeConfirm(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!confirmModal.classList.contains("hidden")) closeConfirm();
    else if (!formModal.classList.contains("hidden")) closeForm();
  });

  // ==========================================================
  //  DATOS (Obtenidos de Firebase)
  // ==========================================================

  // ==========================================================
  //  ARRANQUE
  // ==========================================================
  switchView("dashboard");
})();
