# Detección Inteligente de Amenazas Digitales

Portafolio académico de cinco estudiantes del Instituto Técnico Superior Especializado (ITSE Panamá) para HDI2000 — Habilidades Digitales, con el profesor Jahir Agudo. El proyecto presenta aprendizajes, reflexiones y evidencias sobre ciberseguridad, IA responsable y otras habilidades digitales.

## Ejecutar localmente

1. Abre la raíz del repositorio en VS Code.
2. Con Live Server instalado, abre `index.html` con **Open with Live Server**.
3. Desde la navegación, abre **Portal de estudiantes** para revisar la página del portal.

Como alternativa, ejecuta `python -m http.server 8000` desde la raíz y abre el puerto 8000 en tu navegador. El proyecto usa HTML5, Tailwind CSS v4 por CDN, CSS y JavaScript puro. La conexión a Internet permite cargar Tailwind.

## Editar el portafolio

- `index.html` es la portada del proyecto, con accesos ilustrados a los tres módulos.
- `ciberseguridad.html` reúne la teoría, las amenazas y las referencias.
- `laboratorio.html` contiene los ocho casos interactivos.
- `portafolio.html` reúne el equipo, las habilidades, la galería, la línea de tiempo, la reflexión y el contacto.
- `js/sitio.js` comparte la navegación móvil, el año del pie y los enlaces a secciones entre páginas.
- `estilos.css` contiene la paleta y los estilos responsive. Cambia `--acento` para modificar el cian del sitio.
- `js/main.js` contiene los datos editables de los cinco integrantes, las habilidades y la galería. También controla el menú móvil, el año y los filtros.
- `img/recursos/` contiene la ilustración, el logotipo y el avatar original. Guarda fotos autorizadas en `img/integrantes/` y vistas previas autorizadas en `img/evidencias/`.
- `portal.html` y `js/portal.js` contienen el acceso y los paneles de estudiante y coordinación.
- `js/supabase-config.js` conecta el navegador y `supabase/schema.sql` instala las tablas, políticas y buckets.
- [Guía de sustentación](GUIA-SUSTENTACION.md) y [plantilla de bitácora de IA](PLANTILLA-BITACORA-IA.md).

Para publicar datos del equipo, completa los campos de `equipo` en `js/main.js` con la autorización de cada persona. Para agregar una evidencia autorizada por el coordinador, guarda el PDF o la imagen en `docs/` y añade un objeto a `evidenciasAprobadas` con los campos `titulo`, `unidad` (I a V), `estudiante`, `descripcion`, `aprendizaje` y `archivo`. Puedes incluir `vistaPrevia` y `textoVistaPrevia`. Todo archivo dentro del sitio publicado puede ser accesible por su URL. Revisa los archivos antes de incorporarlos y mantén los originales privados fuera del sitio.

## Portal y seguridad

El portafolio público funciona con el listado local mientras falte la configuración de Supabase. El portal habilita el formulario de acceso cuando están configurados la URL del proyecto y su clave pública.

1. Crea un proyecto Supabase y ejecuta `supabase/schema.sql` una vez en **SQL Editor** antes de cargar datos.
2. En **Authentication**, desactiva el registro público, configura el dominio de Vercel como **Site URL** y permite únicamente las URLs locales y de producción que utilizarás para flujos de Auth. La recuperación de contraseña desde el portal queda pendiente.
3. Crea las cinco cuentas desde **Authentication → Users** mediante el flujo administrativo. Comparte el acceso de manera individual. Para cada cuenta, ejecuta la siguiente consulta desde el editor SQL sustituyendo el UUID, nombre y carrera. Usa el rol `coordinator` para la persona designada y `student` para las otras cuatro.

   ```sql
   insert into public.profiles (id, full_name, career, role)
   values ('UUID_DE_AUTH', 'Nombre autorizado', 'Carrera', 'student');
   ```

4. Completa `url` y `clavePublica` en `js/supabase-config.js` con la URL de la API y la clave publicable para navegador. Mantén las claves secretas y las contraseñas fuera de Git y del frontend.
5. Ejecuta las comprobaciones del final de este documento antes de publicar trabajos reales.

Los archivos originales están en un bucket privado, con lectura para el dueño y coordinación. La galería utiliza un segundo bucket privado que permite acceso a las copias aprobadas mediante enlaces firmados de 90 segundos. Retirar una publicación detiene la emisión de enlaces nuevos. Los emitidos anteriormente funcionan hasta su vencimiento. La copia retirada permanece privada y puede conservarse o limpiarse desde la administración.

El portal admite PDF, JPEG, PNG y WEBP de hasta 10 MB. El navegador comprueba la firma inicial del archivo. Storage limita el MIME declarado y el tamaño. Revisar el contenido antes de publicar sigue siendo responsabilidad de coordinación.

## GitHub y Vercel

Repositorio previsto: [jeyceeshop/proyecto1](https://github.com/jeyceeshop/proyecto1). Sitio compartido por el equipo: [portafolio en Vercel](https://proyecto1-nine-sandy.vercel.app/index.html#inicio). En Vercel, selecciona **Other**, la raíz del repositorio y deja el comando de compilación deshabilitado. Revisa la portada, sus módulos, el portal, las imágenes, el menú y los filtros en el dominio publicado.

El equipo registrará al menos diez commits descriptivos, distribuidos en tres o más días de trabajo real. Cada commit debe reflejar un aporte verificable, como completar una sección, incorporar contenido autorizado o corregir un problema de diseño.

## Puntos extra de la portada

- **Animaciones suaves.** El encabezado y su fotografía aparecen de forma escalonada. Las tarjetas se elevan al pasar el puntero o al recibir el foco. Con la preferencia de movimiento reducido se desactivan estas animaciones y se conserva la indicación visual del foco.
- **Fotografías reales y accesibles.** Se incluyen dos fotos de la documentación oficial de Raspberry Pi, alojadas en el proyecto como WebP. Ambas tienen texto alternativo en español y créditos visibles.
- **Comentarios.** El enlace a [GitHub Issues](https://github.com/jeyceeshop/proyecto1/issues) permite consultar conversaciones y abrir un issue para sugerencias o errores con una cuenta de GitHub. Los comentarios son públicos.

| Fotografía | Crédito y fuente | Adaptación |
|---|---|---|
| Raspberry Pi AI HAT+ | [Raspberry Pi](https://github.com/raspberrypi/documentation/blob/97485d9742bcd15765f208d8c01735d74d542650/documentation/asciidoc/accessories/ai-hat-plus/images/ai-hat-plus-hero.jpg) | Conversión a WebP |
| Raspberry Pi 400 | [Raspberry Pi](https://github.com/raspberrypi/documentation/blob/97485d9742bcd15765f208d8c01735d74d542650/documentation/asciidoc/computers/keyboard-computers/images/rpi400.jpg) | Recorte, reducción y conversión a WebP |

Las dos fotografías y sus versiones WebP se distribuyen bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

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

## Contenido educativo y laboratorio

El bloque **Ciberseguridad** presenta el problema de los fraudes y el robo de información, los objetivos del proyecto y seis tipos de amenazas: phishing, malware, ransomware, robo de identidad, ingeniería social y enlaces fraudulentos. Incluye además un diagrama del análisis asistido por IA, buenas prácticas y un glosario desplegable.

El laboratorio usa JavaScript puro en `js/educacion.js`. Un selector carga ocho ejemplos ficticios. Al pulsar **Analizar**, `FormData` recoge las casillas y un `Set` permite compararlas con los indicadores definidos en el caso. La interfaz explica las señales reconocidas y las que faltaron, muestra un nivel orientativo basado en todas las señales del escenario y recomienda cómo actuar. Los casos se procesan en el navegador y el simulador no envía ni guarda las respuestas.

Se trata de una demostración basada en reglas. Al desarrollarla se aplicaron conceptos de eventos del DOM, renderizado de resultados, modelado de señales y accesibilidad con controles de formulario y foco en el resultado. Un proyecto posterior con IA requeriría un servicio de análisis separado, datos autorizados y minimizados, validación con ejemplos etiquetados, medición de falsos positivos y negativos y revisión humana. Las credenciales de ese servicio se manejarían en el servidor.

Las ilustraciones generadas con IA muestran escenas ficticias y se usan para contextualizar el proyecto. Las fotografías de Raspberry Pi se acreditan en la sección de puntos extra. El laboratorio incluye comunicaciones y registros de acceso ficticios. El visitante revisa el contexto, marca los indicios y elige una acción antes de consultar el resultado.
