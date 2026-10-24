# GALAXY X

Sitio adaptable a móviles servido por un pequeño servidor Node.js, preparado para desplegarse en Railway.

## Despliegue en Railway

1. Crea un proyecto en Railway y conecta el repositorio `juanffx3-beep/GALAXY-X-`.
2. Configura el servicio para desplegar desde la rama `main` y usa la raíz del repositorio como directorio.
3. Railway detectará `package.json`; el comando de inicio configurado es `npm start`.
4. En la configuración de red del servicio, genera un dominio público de Railway.

`railway.json` especifica el comando de inicio y la ruta de comprobación de salud. El servidor escucha en el puerto proporcionado por Railway.

## Enlaces

El catálogo de licencias y los términos se abren dentro de la página, sin redirecciones. Discord abre la invitación configurada en `index.html` y WhatsApp enlaza a `https://wa.me/51993022680`.

La página usa el logo como favicon y reproduce `assets/galaxy-x-theme.mp3` con el volumen inicial al 50 %. Los navegadores pueden bloquear la reproducción automática; si ocurre, el visitante puede iniciar la música desde el control. Las imágenes de proyectos se guardan con nombres propios en `assets/` y se adaptan al espacio de cada tarjeta.

## Seguridad y límites

El servidor Node y el archivo `_headers` aplican políticas de seguridad del navegador: Content Security Policy sin conexiones de API salientes, protección contra iframes, restricción de formularios, permisos de funciones desactivados y políticas de origen/referrer. Netlify aplica `_headers` al publicar el sitio desde la raíz. No hay formularios, analítica ni API que envíen datos personales; el contador de visitas solo utiliza almacenamiento de sesión local. La tipografía se carga desde Google Fonts, que recibe las solicitudes necesarias para servirla; el sitio usa `Referrer-Policy: no-referrer`. Los enlaces de WhatsApp y Discord solo se abren cuando el visitante los selecciona.

Como el sitio es público y se ejecuta en el navegador del visitante, no es posible impedir completamente que alguien vea, copie o descargue su HTML, CSS, JavaScript e imágenes. Estas medidas reducen ciertos riesgos del navegador; no impiden la clonación ni sustituyen la seguridad de cuentas, APIs o servicios externos. No incluyas claves privadas ni contraseñas en los archivos del sitio.

Las imágenes de proyecto proporcionadas son de 400 a 768 píxeles por lado; se muestran adaptadas al diseño, pero reescalarlas no añade detalle real 4K. Para imágenes 4K auténticas se requieren originales de al menos 3840 píxeles de ancho.
