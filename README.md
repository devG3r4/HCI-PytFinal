# HCI-PytFinal

Bitácora Digital para organizar y evaluar evidencias del curso con una interfaz.

## Incluye

- Dashboard oscuro moderno con área funcional de drag and drop.
- Creación, edición, eliminación y filtrado de evidencias por tipo: talleres, laboratorios, parciales y proyectos.
- Adjuntos PDF, PNG y JPG mediante Cloudinary (máximo 10 MB).
- Importación desde la carpeta principal de OneDrive/Microsoft 365 mediante Microsoft Graph, después de configurar Microsoft Entra.
- Vista de archivos con búsqueda y acciones sobre la evidencia seleccionada.
- Vista de evaluación agrupada por tipo de evidencia.
- Ayuda integrada, validación de formularios, confirmación antes de eliminar y movimiento entre categorías.
- Duplicación de evidencias desde la barra de acciones.
- Tema claro clásico con lista de archivos; se activa desde el botón de tema de la cabecera o con la clase `legacy-light-theme` en `<body>`.
- Persistencia local en el navegador mediante `localStorage`.

## Ejecutar localmente

Desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Después abre `http://localhost:5500`.

## OneDrive / Microsoft 365

El botón `Importar desde OneDrive` utiliza Microsoft Graph. Para activar el inicio de sesión:

1. Registra una aplicación de tipo SPA en Microsoft Entra.
2. Agrega la URL local, por ejemplo `http://localhost:5500/`, como URI de redirección.
3. Concede los permisos delegados `User.Read` y `Files.Read`.
4. Define la configuración antes de cargar `app.js`:

```js
window.BITACORA_ONEDRIVE_CONFIG = {
  clientId: "TU_APPLICATION_CLIENT_ID",
  tenantId: "common"
};
```

Sin `clientId`, el resto del portafolio funciona normalmente y el botón muestra una indicación de configuración.
