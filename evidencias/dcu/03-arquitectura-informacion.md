# Arquitectura de información y flujo principal

## Jerarquía

```text
Portafolio HCI
├── Resumen
│   ├── Zona de arrastrar y soltar
│   ├── Resumen de actividad
│   └── Distribución por categoría
├── Todos los archivos
│   ├── Búsqueda
│   ├── Filtros
│   │   ├── Talleres
│   │   ├── Laboratorios
│   │   ├── Parciales
│   │   └── Proyectos
│   └── Acciones: descargar, eliminar, renombrar, mover y duplicar
└── Evaluación
    └── Tablas agrupadas por categoría
```

## Flujo de la tarea principal

```text
Abrir Resumen
  → pulsar Nueva evidencia o arrastrar archivo
  → completar título, descripción y categoría
  → guardar
  → recibir confirmación
  → encontrar la evidencia con búsqueda/filtro
  → abrirla o consultarla en Evaluación
```

## Decisiones de diseño

- Se usan categorías del curso en lugar de unidades porque describen el tipo de entrega.
- El resumen concentra la acción de inicio y el estado del portafolio.
- La vista de archivos favorece encontrar y administrar; la vista de evaluación favorece revisar.
- Las acciones destructivas piden confirmación.
