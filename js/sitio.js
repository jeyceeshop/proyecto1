// Mantener el estado del botón sincronizado con el menú visible.
const menu = document.querySelector('#menu-toggle');
const navegacion = document.querySelector('#navegacion');
function abrirMenu(abierto) {
  navegacion.classList.toggle('open', abierto);
  menu.setAttribute('aria-expanded', String(abierto));
}
menu.addEventListener('click', () => abrirMenu(menu.getAttribute('aria-expanded') === 'false'));
navegacion.addEventListener('click', evento => {
  if (evento.target.closest('a')) abrirMenu(false);
});
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    abrirMenu(false);
    menu.focus();
  }
});
matchMedia('(min-width: 1200px)').addEventListener('change', () => abrirMenu(false));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

// Marcar la sección que ha pasado por debajo del encabezado fijo.
const enlacesDeSeccion = [...document.querySelectorAll('.section-nav a[href^="#"]')];
const secciones = enlacesDeSeccion.map(enlace => document.querySelector(enlace.hash));
const encabezado = document.querySelector('.site-header');
let actualizacionPendiente = false;

function actualizarSeccionActiva() {
  actualizacionPendiente = false;
  const limite = encabezado.getBoundingClientRect().bottom + 25;
  const finalDePagina = window.scrollY > 0
    && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const activa = finalDePagina
    ? secciones.at(-1)
    : secciones.findLast(seccion => seccion.getBoundingClientRect().top <= limite) || secciones[0];

  enlacesDeSeccion.forEach(enlace => {
    if (enlace.hash === '#' + activa.id) enlace.setAttribute('aria-current', 'location');
    else enlace.removeAttribute('aria-current');
  });
}

function programarActualizacion() {
  if (actualizacionPendiente) return;
  actualizacionPendiente = true;
  requestAnimationFrame(actualizarSeccionActiva);
}

if (secciones.length) {
  window.addEventListener('scroll', programarActualizacion, { passive: true });
  window.addEventListener('resize', programarActualizacion);
  actualizarSeccionActiva();
}

// Animar los títulos una sola vez y respetar la preferencia de movimiento.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('section-heading-enter');
      observador.unobserve(entrada.target);
    });
  });
  document.querySelectorAll('.section h2').forEach(titulo => observador.observe(titulo));
}


// Mantener operativos los enlaces a secciones que antes vivían en Inicio.
if (document.querySelector('.home-modules')) {
  const seccion = location.hash.slice(1);
  const rutas = {
    laboratorio: 'laboratorio.html',
    proyecto: 'ciberseguridad.html', problema: 'ciberseguridad.html',
    amenazas: 'ciberseguridad.html', 'inteligencia-artificial': 'ciberseguridad.html',
    proteccion: 'ciberseguridad.html', glosario: 'ciberseguridad.html', fuentes: 'ciberseguridad.html',
    'sobre-mi': 'portafolio.html', habilidades: 'portafolio.html',
    evidencias: 'portafolio.html', 'linea-de-tiempo': 'portafolio.html',
    reflexion: 'portafolio.html', contacto: 'portafolio.html',
  };
  if (Object.hasOwn(rutas, seccion)) location.replace(rutas[seccion] + location.hash);
}

// Si una imagen externa se bloquea, conservar visible la ficha de procedencia.
document.querySelectorAll('.timeline-figure img').forEach(imagen => {
  const quitarImagenNoDisponible = () => { imagen.hidden = true; };
  imagen.addEventListener('error', quitarImagenNoDisponible, { once: true });
  if (imagen.complete && imagen.naturalWidth === 0) quitarImagenNoDisponible();
});
