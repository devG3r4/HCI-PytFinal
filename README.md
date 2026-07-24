# HCI-PytFinal

Bitácora Digital para organizar y evaluar evidencias del curso con una interfaz inspirada en Dropbox.

## Incluye

- Dashboard oscuro moderno con área funcional de drag and drop.
- Creación, edición, eliminación y filtrado de evidencias por unidad.
- Adjuntos PDF, PNG y JPG mediante Cloudinary (máximo 10 MB).
- Vista de archivos con búsqueda y acciones sobre la evidencia seleccionada.
- Vista de evaluación agrupada por unidad.
- Tema claro clásico con lista de archivos; se activa desde el botón de tema de la cabecera o con la clase `legacy-light-theme` en `<body>`.
- Persistencia local en el navegador mediante `localStorage`.

## Ejecutar localmente

Desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Después abre `http://localhost:5500`.
