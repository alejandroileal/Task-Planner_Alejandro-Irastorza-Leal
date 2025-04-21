# Devotion

**Devotion** es una aplicación web de gestión de tareas y eventos desarrollada como proyecto del módulo de programación web en el Master de Desarrollo Web en Evolve Academy. Inspirada en el diseño limpio y minimalista de **Notion**, su nombre surge de la combinación de **DEV** (desarrollo) y **Notion**.

Esta aplicación permite a los usuarios gestionar su día a día de manera clara, organizada y visualmente atractiva.

## Características principales

- **Gestión de tareas**

  - Crear, editar y eliminar tareas con título, descripción, fecha de vencimiento y estado (pendiente, en progreso, completada).

- **Gestión de eventos**

  - Crear, editar y eliminar eventos con fecha y hora.
  - Consulta del clima del día del evento mediante la **OpenWeatherMap API**.

- **Noticias personalizadas**

  - Muestra noticias recientes de tecnología y productividad mediante la **NewsAPI**.
  - Búsqueda de noticias por tema.

- **Persistencia de datos**
  - Las tareas y eventos se almacenan en `localStorage`, lo que permite mantener los datos entre sesiones.

## Tecnologías utilizadas

- HTML5
- CSS3 (con enfoque **Mobile First** y metodología **BEM**)
- JavaScript Vanilla (JS)
- APIs externas:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [NewsAPI](https://newsapi.org/)

## Diseño y estructura

- Estética **minimalista**, con predominio de blancos, grises y toques de color para resaltar información importante.
- Interfaz **responsive**, adaptada a dispositivos móviles y de escritorio.
- Lógica centralizada en un único archivo `app.js`, que organiza la app a través de un objeto principal `app` que contiene:
  - Estado global
  - Sistema de rutas condicionales (`hashchange`)
  - Renderizado dinámico de tareas, eventos y vistas
  - Navegación sin recargar la página (simulación tipo `react-router-dom`)

## Buenas prácticas aplicadas

- Código limpio, modular y legible
- Separación de responsabilidades por componentes
- Uso de `Prettier` y `ESLint` para mantener un estilo consistente
- Uso de `const` y `let`, evitando variables globales
- Validaciones para inputs de tareas y eventos
- Buen manejo de errores en peticiones a APIs
- Navegación entre vistas sin recargar la página
- Código escalable y reutilizable

## Requisitos para usar la app

- Clonar el repositorio
- Abrir el proyecto con **Live Server** (VS Code recomendado)
- No se requiere backend ni conexión a base de datos

## Reflexión final

Este proyecto fue una oportunidad para aplicar conocimientos avanzados de manipulación del DOM, arquitectura modular, consumo de APIs externas y diseño web responsive.
