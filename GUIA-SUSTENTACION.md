# Guía de sustentación

## Reparto sugerido para cinco integrantes

Adapten el reparto al trabajo real de cada integrante. Con 6 minutos en total, queda margen para transiciones dentro del rango de 5 a 7 minutos.

| Tiempo | Integrante | Qué mostrar |
|---|---|---|
| 0:00–1:00 | 1 | Objetivo académico, datos del curso y estructura HTML. Abrir la portada y ubicar las siete secciones. |
| 1:00–2:00 | 2 | Identidad visual, Tailwind y CSS. Cambiar el ancho de la ventana para demostrar el diseño responsive. |
| 2:00–3:00 | 3 | Habilidades y evidencias autorizadas. Abrir una evidencia real si ya está disponible y explicar qué demuestra. |
| 3:00–4:15 | 4 | JavaScript. Abrir el menú móvil, seleccionar una unidad y señalar el año del pie de página. |
| 4:15–6:00 | 5 | Mostrar el repositorio, un commit real y la URL de Vercel. Explicar cómo se usó la IA y cerrar con la reflexión del equipo. |

## Conceptos para explicar

- **HTML** estructura el contenido. En este sitio, `header`, `main`, `section` y `footer` describen la función de los bloques.
- **Tailwind CSS** permite aplicar estilos mediante clases utilitarias. La página lo carga desde el CDN y usa `estilos.css` para la paleta y los componentes propios.
- **JavaScript** escucha interacciones y modifica la página. El menú alterna una clase y actualiza `aria-expanded`. El filtro compara la unidad seleccionada con la unidad de cada evidencia y vuelve a dibujar la galería. El pie usa `new Date().getFullYear()`.
- **Git** registra el historial de cambios. Un **commit** guarda una versión de los archivos seleccionados con un mensaje descriptivo.
- **GitHub** aloja el repositorio y permite revisar y compartir el historial. **Vercel** sirve el sitio estático a través de una URL pública.

## Demostración de edición

En Live Server, cambia la descripción de una habilidad en el arreglo `habilidades` de `js/main.js`, guarda y muestra el resultado. Para añadir una habilidad, agrega una entrada con nombre, descripción y trazado SVG siguiendo las entradas existentes. Para cambiar un color, edita `--acento` en `estilos.css`. Para cambiar el subtítulo de la portada, edita el párrafo con la clase `hero-lead` en `index.html`.

Para demostrar el flujo de Git, muestra cómo usar `git status`, `git add <archivo>` y `git commit -m "Describe el cambio"` en una rama de práctica. `git push origin <rama>` envía esa rama a GitHub cuando el equipo autorice publicarla. Durante la pausa posterior a la entrega, demuestra la edición sin crear commits.

## Diez preguntas probables

1. **¿Qué problema aborda el proyecto?** Presenta aprendizajes sobre ciberseguridad y habilidades digitales y organiza evidencias académicas por unidad.
2. **¿Por qué hay un solo H1?** Identifica el tema principal. Cada H2 titula una sección del portafolio.
3. **¿Cómo cambia el diseño entre pantallas?** CSS adapta la cantidad de columnas y muestra el menú compacto según el ancho.
4. **¿Qué aporta Tailwind?** Sus clases utilitarias permiten definir estilos como la distribución flexible y el espaciado.
5. **¿Cómo se abre el menú móvil?** El botón cambia una clase que controla la visibilidad y actualiza el estado accesible.
6. **¿Cómo funciona el filtro?** JavaScript selecciona las evidencias que pertenecen a la unidad elegida y actualiza la galería.
7. **¿De dónde sale el año del pie?** El navegador obtiene el año actual con `new Date().getFullYear()`.
8. **¿Qué diferencia hay entre commit y push?** El commit registra un cambio en el historial local. El push envía commits a un repositorio remoto.
9. **¿Qué hace Vercel en el proyecto?** Sirve los archivos estáticos del repositorio en una URL web.
10. **¿Qué hizo la IA y qué hizo el equipo?** Describe una consulta real de la bitácora, qué verificaron los estudiantes y qué decisión o corrección hicieron.

## Demostración de la ampliación sobre ciberseguridad

Usen este reparto para una exposición de seis minutos que incluya el laboratorio.

| Tiempo | Integrante | Qué mostrar |
|---|---|---|
| 0:00–1:00 | 1 | Presentar el problema de los fraudes y robos de información. Explicar el objetivo general y cómo se integra el contenido con el portafolio. |
| 1:00–2:00 | 2 | Mostrar las seis amenazas. Usar phishing y ransomware para explicar una diferencia, un posible efecto y una medida de prevención. |
| 2:00–3:00 | 3 | Recorrer el diagrama de IA y dar un ejemplo de falso positivo y falso negativo. |
| 3:00–4:30 | 4 | Abrir el laboratorio, elegir **Promoción instantánea**, marcar una señal y pulsar **Analizar**. Explicar la diferencia entre la puntuación y el nivel del caso. |
| 4:30–6:00 | 5 | Mostrar una práctica de protección, el portafolio y sus evidencias disponibles. Cerrar con GitHub y un aprendizaje real del equipo. |

El laboratorio compara casillas con reglas escritas en JavaScript. Por ejemplo, si el caso de la promoción tiene tres señales y el visitante reconoce una, la interfaz muestra **1 de 3**. El nivel del caso sigue siendo **Múltiples señales**. Esta distinción permite explicar cómo se programó el resultado y por qué una puntuación baja del visitante jamás convierte el mensaje en seguro.
