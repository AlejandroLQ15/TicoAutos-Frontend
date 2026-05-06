# TicoAutos — Frontend

Son **páginas HTML, CSS y JavaScript** clásicas: no hay `npm start` tipo React acá. El navegador habla con el backend REST según la configuración de **`js/config.js`**.

## Cómo se usa en el día a día

1. Levantá el **backend** (Mongo + servidor en el puerto 3000 por defecto).
2. Abrí el proyecto en el navegador:
   - **Live Server** (VS Code) desde esta carpeta, por ejemplo `pages/login.html`; o
   - otra forma que te sirva para servir archivos estáticos.

Buen punto de entrada: **`pages/login.html`**. Sin cuenta → **`pages/registro.html`**. Con sesión → listado, detalle de vehículo, mensajes al propietario, perfil, etc.

## Conectar con el backend

Archivo clave: **`js/config.js`**.

- En **localhost / 127.0.0.1** ya apunta a `http://localhost:3000`.
- Si abrís el HTML como **archivo suelto** (`file://`), el mismo archivo suele tratar eso como “modo local” para que no pegue por error a un servidor remoto.
- Si **desplegás** frontend y backend en otro lado, cambiá ahí `API_BASE` y `API_ORIGIN` a tus URLs reales.

Sin el backend corriendo vas a ver errores de red o mensajes genéricos; primero asegurate que la API responda.

## Integración (idea general)

El frontend usa rutas bajo `/api` del servidor REST: registro, login (a veces con pantalla extra de código SMS), autos, preguntas/respuestas entre usuarios, perfil, etc. Los detalles exactos los ves en la pestaña **Red** del navegador mientras navegás.

## Repo padre

En la raíz del proyecto tenés el README general, diagramas en `docs/` y guías si tu curso pide entrega en video o informe.
