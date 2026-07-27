# HCI-PytFinal

Bitácora Digital para organizar y evaluar evidencias del curso con una interfaz.

## Incluye

- Dashboard oscuro moderno con área funcional de drag and drop.
- Creación, edición, eliminación y filtrado de evidencias por tipo: talleres, laboratorios, parciales y proyectos.
- Adjuntos PDF, PNG y JPG mediante Cloudinary (máximo 10 MB).
- Botón preparado para importar archivos desde OneDrive/Microsoft 365 mediante Microsoft Graph.
- Vista de archivos con búsqueda y acciones sobre la evidencia seleccionada.
- Vista de evaluación agrupada por tipo de evidencia.
- Tema claro clásico con lista de archivos; se activa desde el botón de tema de la cabecera o con la clase `legacy-light-theme` en `<body>`.
- Persistencia local en el navegador mediante `localStorage`.

## Ejecutar localmente

Desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Después abre `http://localhost:5500`.

## OneDrive / Microsoft 365

El botón `Import from OneDrive` está preparado para Microsoft Graph. Para activar el inicio de sesión, registra una aplicación SPA en Microsoft Entra y define antes de cargar `app.js`:

```js
window.BITACORA_ONEDRIVE_CONFIG = {
  clientId: "TU_APPLICATION_CLIENT_ID",
  tenantId: "common"
};
```
