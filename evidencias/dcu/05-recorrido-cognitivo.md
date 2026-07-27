# Recorrido cognitivo

Usuario hipotético: estudiante que desea registrar un laboratorio con un PDF.

| Paso | Acción | ¿La persona sabe qué hacer? | Respuesta del sistema |
|---|---|---|---|
| 1 | Abrir el Resumen | Sí: el mensaje invita a iniciar | Dashboard con CTA “Nueva evidencia” y zona de carga |
| 2 | Pulsar “Nueva evidencia” | Sí: botón visible en sidebar y contenido | Modal con título “Registrar nueva evidencia” |
| 3 | Completar datos | Sí: etiquetas y ejemplos orientan | Validación junto a cada campo |
| 4 | Elegir Laboratorios | Sí: opción en selector y filtros | Categoría se muestra en tarjeta y evaluación |
| 5 | Guardar | Sí: botón primario y texto contextual | Toast “Evidencia guardada con éxito” |
| 6 | Encontrar evidencia | Sí: “Todos los archivos” y búsqueda | Resultado filtrado y contador |
| 7 | Revisar | Sí: vista “Evaluación” | Tabla agrupada con fecha y archivo |

## Hallazgos

- El recorrido no exige conocer la estructura interna de `localStorage`.
- La categoría se elige en el momento de registrar, cuando la decisión tiene contexto.
- El feedback inmediato reduce la duda sobre si la evidencia se guardó.
