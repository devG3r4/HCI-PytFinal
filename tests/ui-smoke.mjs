import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const capturesDir = path.join(projectRoot, "evidencias", "capturas");
const appUrl = `file://${path.join(projectRoot, "index.html")}`;

await mkdir(capturesDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

await page.addInitScript(() => {
  localStorage.clear();
  sessionStorage.clear();
});
await page.goto(appUrl, { waitUntil: "domcontentloaded" });
const settleView = () => page.waitForTimeout(350);

const expectCount = async (selector, expected, label) => {
  const count = await page.locator(selector).count();
  if (count !== expected) {
    throw new Error(`${label}: se esperaban ${expected} elementos y se encontraron ${count}.`);
  }
};

const expectNoOpenModal = async (label) => {
  const openModals = await page.locator(".modal-overlay:not(.hidden)").evaluateAll(
    (elements) => elements.map((element) => element.id)
  );
  if (openModals.length > 0) {
    throw new Error(`${label}: quedaron modales abiertos (${openModals.join(", ")}).`);
  }
};

await settleView();
await page.screenshot({ path: path.join(capturesDir, "01-resumen.png") });

await page.click("#btn-help");
await page.locator("#help-modal:not(.hidden)").waitFor();
await settleView();
await page.screenshot({ path: path.join(capturesDir, "02-ayuda.png") });
await page.click("#btn-help-understood");
await expectNoOpenModal("Cierre de ayuda");

await page.click("#btn-new-evidence");
await page.click("#btn-submit");
await expectCount(".form-group.has-error", 3, "Validación del formulario");
await page.fill("#input-title", "Laboratorio de accesibilidad");
await page.fill("#input-description", "Evaluación de navegación por teclado, contraste y mensajes de error.");
await page.selectOption("#input-unit", "Laboratorios");
await page.click("#btn-submit");

await page.click('[data-view="portfolio"]');
await page.getByText("Laboratorio de accesibilidad", { exact: true }).waitFor();
await expectNoOpenModal("Registro de evidencia");
await settleView();
await page.screenshot({ path: path.join(capturesDir, "03-archivos.png") });

const createdCard = page.locator(".evidence-card").filter({ hasText: "Laboratorio de accesibilidad" });
await createdCard.click();
await page.click("#action-copy");
await page.getByText("Copia de Laboratorio de accesibilidad", { exact: true }).waitFor();

const copyCard = page.locator(".evidence-card").filter({ hasText: "Copia de Laboratorio de accesibilidad" });
await copyCard.waitFor();
await page.click("#action-move");
await page.selectOption("#input-unit", "Proyectos");
await page.click("#btn-submit");
await page.getByText("Proyectos", { exact: true }).first().waitFor();

await page.fill("#global-search", "accesibilidad");
await expectCount(".evidence-card", 2, "Búsqueda de evidencias");
await page.fill("#global-search", "");

await page.click('[data-view="evaluation"]');
await page.locator(".eval-group").first().waitFor();
await expectNoOpenModal("Vista de evaluación");
await settleView();
await page.screenshot({ path: path.join(capturesDir, "04-evaluacion.png") });

await page.click("#theme-toggle");
await page.click('[data-view="portfolio"]');
await settleView();
await page.screenshot({ path: path.join(capturesDir, "05-tema-claro.png") });

await page.setViewportSize({ width: 390, height: 844 });
await page.click("#menu-toggle");
await page.click('[data-view="dashboard"]');
await settleView();
await page.screenshot({ path: path.join(capturesDir, "06-vista-movil.png") });

if (pageErrors.length > 0) {
  throw new Error(`Errores JavaScript detectados: ${pageErrors.join(" | ")}`);
}

console.log("Prueba funcional completada: navegación, validación, CRUD, búsqueda, tema y adaptación móvil.");
console.log(`Capturas guardadas en ${capturesDir}`);
await browser.close();
