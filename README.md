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
- [Guía de sustentación](GUIA-SUSTENTACION.md) y [plantilla de bitácora de IA](PLANTILLA-BITACORA-IA.md).

Para publicar datos del equipo, completa los campos de `equipo` en `js/main.js` con la autorización de cada persona. Para agregar una evidencia autorizada por el coordinador, guarda el PDF o la imagen en `docs/` y añade un objeto a `evidenciasAprobadas` con los campos `titulo`, `unidad` (I a V), `estudiante`, `descripcion`, `aprendizaje` y `archivo`. Puedes incluir `vistaPrevia` y `textoVistaPrevia`. Todo archivo dentro del sitio publicado puede ser accesible por su URL. Revisa los archivos antes de incorporarlos y mantén los originales privados fuera del sitio.

## Portal y seguridad

La integración con Supabase requiere autorización, la URL del proyecto, una clave pública de navegador y la configuración administrativa de las cuentas, las políticas RLS, el almacenamiento privado y las URLs permitidas de autenticación. El portal incluirá acceso controlado de estudiantes, carga de evidencias y revisión por el coordinador. Las credenciales administrativas se conservan fuera del frontend.

## GitHub y Vercel

Repositorio previsto: [jeyceeshop/proyecto1](https://github.com/jeyceeshop/proyecto1). Sitio compartido por el equipo: [portafolio en Vercel](https://proyecto1-nine-sandy.vercel.app/index.html#inicio). En Vercel, selecciona **Other**, la raíz del repositorio y deja el comando de compilación deshabilitado. Revisa ambas páginas, sus imágenes, el menú y los filtros en el dominio publicado.

El equipo registrará al menos diez commits descriptivos, distribuidos en tres o más días de trabajo real. Cada commit debe reflejar un aporte verificable, como completar una sección, incorporar contenido autorizado o corregir un problema de diseño.

## Uso de inteligencia artificial

Se utilizó IA como apoyo para planificar y construir la primera versión del portafolio. La temática incluye IA aplicada a la ciberseguridad. El sitio presenta contenido académico y su galería organiza evidencias por unidad.

## Entregas y rúbrica

| Fecha en Panamá | Entregable |
|---|---|
| 20 de noviembre de 2026 | Primera versión local. |
| 23 de noviembre de 2026 | Repositorio GitHub y primera publicación en Vercel. |
| 24 de noviembre de 2026 | Personalización de Inicio, Sobre nosotros y Habilidades. |
| 27 de noviembre de 2026, antes de las 11:59 p. m. | Avance con URL pública, Inicio, Sobre nosotros y al menos tres evidencias reales. |
| 30 de noviembre de 2026, antes de las 11:59 p. m. | Entrega final. Meta de siete evidencias reales distribuidas entre las unidades. |
| 1 y 4 de diciembre de 2026 | Sustentaciones. Tras la entrega final, pausar los commits hasta la sustentación salvo autorización del profesor. |

| Criterio | Puntos | Qué revisar antes de entregar |
|---|---:|---|
| Estructura y secciones | 15 | Siete secciones, un solo H1 y datos del curso. |
| Contenido y evidencias | 20 | Datos autorizados del equipo, reflexiones propias y archivos reales que abren. |
| Diseño responsive | 15 | Celular, tableta y escritorio. Revisar ambos temas. |
| JavaScript | 10 | Menú móvil, filtros sin recarga y año automático. |
| Git y GitHub | 10 | Repositorio público, README y diez commits en tres o más días. |
| Publicación en Vercel | 10 | URL pública correcta y recursos cargados. |
| Bitácora de IA | 10 | Ocho consultas reales y reflexión final, en PDF. |
| Sustentación | 10 | Ensayo de cinco a siete minutos y un cambio sencillo en vivo. |

## Comprobaciones del portal cuando esté conectado

Probar con una cuenta de estudiante y otra de coordinación. Confirmar que una carga válida queda pendiente y que un rechazo muestra el motivo. Verificar que el coordinador pueda aprobar y publicar una copia revisada. Confirmar desde una sesión sin iniciar que se pueda abrir la copia aprobada y que los archivos originales, los pendientes y los rechazados requieran acceso autorizado. Verificar también que un estudiante no pueda leer ni editar las evidencias de otro ni aprobar las suyas.
