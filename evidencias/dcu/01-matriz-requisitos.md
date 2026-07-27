# Matriz de requisitos

Fuente: `PROYECTO FINAL DEL CURSO HCI.pdf` y revisión del repositorio `devG3r4/HCI-PytFinal`.

| Requisito del curso | Decisión en Bitácora | Evidencia |
|---|---|---|
| Registrar actividades o evidencias | Modal “Nueva evidencia” con título, descripción, categoría y adjunto opcional | `index.html`, `app.js`, captura `01-resumen.png` |
| Organizar información por secciones | Categorías Talleres, Laboratorios, Parciales y Proyectos | `index.html`, `app.js`, captura `03-archivos.png` |
| Visualizar contenido almacenado | Tarjetas en “Todos los archivos” y tablas en “Evaluación” | `app.js`, captura `04-evaluacion.png` |
| Navegación clara | Sidebar con Resumen, Todos los archivos, Evaluación y filtros rápidos | `index.html`, wireframes |
| Agregar información | Validación y creación persistente en `localStorage` | `tests/ui-smoke.mjs` |
| Editar información | Edición de título, descripción, categoría y archivo | `app.js` |
| Eliminar información | Modal de confirmación antes de borrar | `app.js` |
| Usabilidad | Búsqueda, mensajes de estado, foco inicial, Escape y diseño responsive | `app.js`, `styles.css`, capturas |
| Diseño centrado en el usuario | Flujo orientado a registrar, encontrar y revisar evidencias | `02-proto-persona.md`, `03-arquitectura-informacion.md` |

## Requisitos no funcionales

- **Accesibilidad:** etiquetas, mensajes de error, `aria-live`, foco visible y navegación por teclado en los puntos principales.
- **Rendimiento:** aplicación estática sin framework; carga local de HTML, CSS y JavaScript.
- **Compatibilidad:** diseño adaptable a escritorio y móvil.
- **Privacidad:** la información descriptiva se guarda en el navegador; OneDrive es opcional y requiere permisos explícitos de Microsoft.
- **Mantenibilidad:** la lógica está separada en `app.js`, estilos en `styles.css` y estructura en `index.html`.
