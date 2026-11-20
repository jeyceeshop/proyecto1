# Detección Inteligente de Amenazas Digitales

Portafolio académico de cinco estudiantes del Instituto Técnico Superior Especializado (ITSE Panamá) para HDI2000 — Habilidades Digitales, con el profesor Jahir Agudo. El proyecto presenta aprendizajes, reflexiones y evidencias sobre ciberseguridad, IA responsable y otras habilidades digitales.

## Ejecutar localmente

1. Abre la raíz del repositorio en VS Code.
2. Con Live Server instalado, abre `index.html` con **Open with Live Server**.
3. Desde la navegación, abre **Portal de estudiantes** para revisar la página del portal.

Como alternativa, ejecuta `python -m http.server 8000` desde la raíz y abre el puerto 8000 en tu navegador. El proyecto usa HTML5, Tailwind CSS v4 por CDN, CSS y JavaScript puro. La conexión a Internet permite cargar Tailwind.

## Editar el portafolio

- `index.html` contiene las secciones, los datos del curso, la línea de tiempo y la reflexión grupal.
- `estilos.css` contiene la paleta y los estilos responsive. Cambia `--acento` para modificar el cian del sitio.
- `js/main.js` contiene los datos editables de los cinco integrantes, las habilidades y la galería. También controla el menú móvil, el año y los filtros.
- `img/recursos/` contiene la ilustración, el logotipo y el avatar original. Guarda fotos autorizadas en `img/integrantes/` y vistas previas autorizadas en `img/evidencias/`.
- `portal.html` indica el estado de la integración privada.

Para publicar datos del equipo, completa los campos de `equipo` en `js/main.js` con la autorización de cada persona. Para agregar una evidencia autorizada por el coordinador, guarda el PDF o la imagen en `docs/` y añade un objeto a `evidenciasAprobadas` con los campos `titulo`, `unidad` (I a V), `estudiante`, `descripcion`, `aprendizaje` y `archivo`. Puedes incluir `vistaPrevia` y `textoVistaPrevia`. Todo archivo dentro del sitio publicado puede ser accesible por su URL. Revisa los archivos antes de incorporarlos y mantén los originales privados fuera del sitio.

## Portal y seguridad

La integración con Supabase requiere autorización, la URL del proyecto, una clave pública de navegador y la configuración administrativa de las cuentas, las políticas RLS, el almacenamiento privado y las URLs permitidas de autenticación. El portal incluirá acceso controlado de estudiantes, carga de evidencias y revisión por el coordinador. Las credenciales administrativas se conservan fuera del frontend.

## GitHub y Vercel

Repositorio previsto: [jeyceeshop/proyecto1](https://github.com/jeyceeshop/proyecto1). La URL de Vercel se añadirá después del despliegue autorizado. En Vercel, selecciona **Other**, la raíz del repositorio y deja el comando de compilación deshabilitado. Revisa ambas páginas, sus imágenes, el menú y los filtros en el dominio publicado.

El equipo registrará al menos diez commits descriptivos, distribuidos en tres o más días de trabajo real. Cada commit debe reflejar un aporte verificable, como completar una sección, incorporar contenido autorizado o corregir un problema de diseño.

## Uso de inteligencia artificial

Se utilizó IA como apoyo para planificar y construir la primera versión del portafolio. La temática incluye IA aplicada a la ciberseguridad. El sitio presenta contenido académico y su galería organiza evidencias por unidad.
