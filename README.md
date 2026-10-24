# GALAXY X

Sitio estático, adaptable a móviles y sin dependencias de compilación. Los mismos archivos sirven para GitHub Pages y Railway.

## GitHub Pages

1. Sube estos archivos a la rama `main`.
2. En el repositorio, abre **Settings → Pages** y selecciona **GitHub Actions** como origen.
3. El flujo de `.github/workflows/pages.yml` publica el sitio en cada cambio a `main`.

## Railway

Conecta el repositorio a un proyecto Railway. El archivo `railway.json` configura el comando de inicio; Railway ejecutará `npm start` y usará el puerto asignado automáticamente.

## Enlaces

El catálogo de licencias y la sección de copyright se abren dentro de la página, sin redirecciones. Discord abre la invitación configurada en `index.html`; WhatsApp se muestra como tarjeta informativa hasta añadir su dirección real.
