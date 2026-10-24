# MrGarabato

Sitio estático, adaptable a móviles y sin dependencias de compilación. Los mismos archivos sirven para GitHub Pages y Railway.

## GitHub Pages

1. Sube estos archivos a la rama `main`.
2. En el repositorio, abre **Settings → Pages** y selecciona **GitHub Actions** como origen.
3. El flujo de `.github/workflows/pages.yml` publica el sitio en cada cambio a `main`.

## Railway

Conecta el repositorio a un proyecto Railway. El archivo `railway.json` configura el comando de inicio; Railway ejecutará `npm start` y usará el puerto asignado automáticamente.

## Enlaces

La tienda apunta al dominio que aparece en la referencia (`mrgarabato.com`) y Discord abre la invitación configurada en `index.html`. Neural Auth y WhatsApp se muestran como tarjetas informativas hasta añadir sus direcciones reales. Se pueden conectar desde `index.html`; los mensajes de esas tarjetas están en `script.js`.
