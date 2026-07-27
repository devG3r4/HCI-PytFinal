# Evaluación heurística

Método aplicado: revisión experta de la interfaz siguiendo las diez heurísticas de Nielsen. Se recorrieron los flujos de crear, buscar, editar, mover, duplicar, eliminar y revisar una evidencia.

| Heurística | Observación | Decisión o corrección |
|---|---|---|
| Visibilidad del estado | El sistema muestra toasts, conteos y estado de almacenamiento | Se conservaron mensajes de guardado, error y eliminación |
| Correspondencia con el mundo real | “Talleres, laboratorios, parciales y proyectos” coincide con el lenguaje del curso | Se reemplazaron las antiguas “Unidades” |
| Control y libertad | El usuario puede cancelar modales y salir con Escape | Se conservaron cancelación, clic fuera y Escape |
| Consistencia | Había etiquetas en inglés mezcladas con español | Se tradujeron navegación y acciones principales |
| Prevención de errores | El formulario valida campos y archivos; eliminar pide confirmación | Se conservaron límites de 10 MB y tipos permitidos |
| Reconocimiento | Categorías y acciones están visibles; la búsqueda evita recordar ubicaciones | Se añadieron filtros rápidos y ayuda integrada |
| Flexibilidad | Atajo Ctrl/Cmd + K, arrastrar y soltar y tema claro | Se conservaron las tres alternativas |
| Diseño minimalista | Botones sin función podían generar expectativas | Se transformaron en funciones reales: nueva evidencia, mover y duplicar |
| Recuperación de errores | Los errores se muestran junto al campo o en un toast | Se añadió `aria-invalid` y mensajes de campo |
| Ayuda | Antes no había guía para un primer uso | Se agregó el modal “Cómo usar la bitácora” |

## Resultado

La evaluación produjo cambios visibles en idioma, ayuda, acciones y accesibilidad. Esta es evidencia de revisión experta; no representa por sí sola una prueba con usuarios.
