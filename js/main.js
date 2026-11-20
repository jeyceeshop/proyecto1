// Completar solo con información que cada integrante autorice publicar.
const equipo = [
  { nombre: '', carrera: '', foto: '', biografia: '', habilidades: [], aporte: '', reflexion: '', correo: '', linkedin: '' },
  { nombre: '', carrera: '', foto: '', biografia: '', habilidades: [], aporte: '', reflexion: '', correo: '', linkedin: '' },
  { nombre: '', carrera: '', foto: '', biografia: '', habilidades: [], aporte: '', reflexion: '', correo: '', linkedin: '' },
  { nombre: '', carrera: '', foto: '', biografia: '', habilidades: [], aporte: '', reflexion: '', correo: '', linkedin: '' },
  { nombre: '', carrera: '', foto: '', biografia: '', habilidades: [], aporte: '', reflexion: '', correo: '', linkedin: '' },
];

const habilidades = [
  ['Google Workspace y Microsoft Teams', 'Organización de archivos, edición compartida y coordinación de actividades de clase.', 'M4 6h16v10H8l-4 4z M8 10h8'],
  ['Seguridad digital', 'Reconocimiento de señales de fraude y protección de cuentas e información personal.', 'M12 3l8 3v6c0 5-5 8-8 9-3-1-8-4-8-9V6z M9 12l2 2 4-4'],
  ['Microsoft Word y normas APA', 'Preparación de documentos académicos con estructura, citas y referencias.', 'M6 3h9l3 3v15H6z M9 10h6m-6 4h6m-6 4h4'],
  ['Microsoft Excel', 'Uso de fórmulas, tablas y gráficos para organizar y analizar datos de clase.', 'M4 4h16v16H4z M4 9h16M4 14h16M10 9v11'],
  ['Microsoft PowerPoint', 'Diseño de diapositivas que sintetizan información y apoyan una explicación oral.', 'M4 4h16v12H4z M12 16v5m-4 0h8 M8 12l3-3 2 2 3-4'],
  ['Inteligencia artificial responsable', 'Formulación de consultas, verificación de respuestas y registro del apoyo recibido.', 'M12 3v4m0 10v4M3 12h4m10 0h4M8 8h8v8H8z'],
  ['PSeInt y algoritmos', 'Representación de soluciones paso a paso con decisiones, ciclos y estructuras de datos.', 'M9 3h6v5H9z M12 8v4m-6 4v-4h12v4 M3 16h6v5H3z M15 16h6v5h-6z'],
  ['HTML5', 'Estructuración del contenido web con secciones, enlaces y encabezados semánticos.', 'M8 6l-6 6 6 6m8-12 6 6-6 6m-2-14-4 16'],
  ['Tailwind CSS', 'Uso de clases utilitarias para controlar el espaciado y adaptar la composición.', 'M4 5h16v14H4z M4 10h16m-10 0v9'],
  ['JavaScript', 'Implementación del menú, los filtros y otras interacciones directamente en el navegador.', 'M13 2L5 13h6l-1 9 9-12h-6z'],
  ['Git y GitHub', 'Registro de cambios del proyecto y coordinación del trabajo en un repositorio compartido.', 'M6 6v12m0-5h7a4 4 0 0 0 4-4V6 M4 3h4v3H4z M15 3h4v3h-4z M4 18h4v3H4z'],
  ['Vercel', 'Preparación de un sitio estático y revisión de sus páginas y recursos tras el despliegue.', 'M4 19L12 5l8 14z'],
];

const unidades = {
  I: 'Habilidades digitales',
  II: 'Web y seguridad digital',
  III: 'Ofimática',
  IV: 'Algoritmos',
  V: 'Creación de contenido',
};

// Cada publicación autorizada incluye titulo, unidad, estudiante, descripcion, aprendizaje,
// archivo y, si está disponible, vistaPrevia (una imagen autorizada con su texto alternativo).
const evidenciasAprobadas = [];

function elemento(etiqueta, texto, clase) {
  const nodo = document.createElement(etiqueta);
  if (texto) nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}

function enlace(texto, destino, clase) {
  const nodo = elemento('a', texto, clase);
  nodo.href = destino;
  return nodo;
}

function mostrarEquipo() {
  equipo.forEach((persona, indice) => {
    const nombre = persona.nombre || `Integrante ${indice + 1}`;
    const tarjeta = elemento('article', '', 'card team-card');
    const foto = elemento('img');
    foto.src = persona.foto || 'img/recursos/avatar.svg';
    foto.alt = persona.foto ? `Retrato de ${nombre}` : '';
    foto.width = foto.height = 64;
    foto.loading = 'lazy';
    const detalles = elemento('details');
    detalles.append(elemento('summary', 'Presentación y aporte'),
      elemento('p', persona.biografia || 'Presentación pendiente de editar.'),
      elemento('p', `Habilidades: ${persona.habilidades.join(', ') || 'Pendientes de editar.'}`),
      elemento('p', `Aporte: ${persona.aporte || 'Pendiente de editar.'}`));
    tarjeta.append(foto, elemento('h3', nombre), elemento('p', persona.carrera || 'Carrera pendiente de editar'), detalles);
    document.querySelector('#equipo').append(tarjeta);

    const reflexion = elemento('details', '', 'card');
    reflexion.append(elemento('summary', nombre), elemento('p', persona.reflexion || 'Reflexión individual pendiente.'));
    document.querySelector('#reflexiones').append(reflexion);

    const contacto = elemento('article', '', 'card');
    contacto.append(elemento('h3', nombre));
    const correo = elemento('p');
    correo.append(persona.correo ? enlace(persona.correo, `mailto:${persona.correo}`) : 'Correo institucional pendiente de autorización.');
    contacto.append(correo);
    if (persona.linkedin) contacto.append(enlace('LinkedIn', persona.linkedin));
    document.querySelector('#contactos').append(contacto);
  });
}

function mostrarHabilidades() {
  const svgNS = 'http://www.w3.org/2000/svg';
  habilidades.forEach(([nombre, descripcion, trazado]) => {
    const tarjeta = elemento('article', '', 'card skill-card');
    const icono = document.createElementNS(svgNS, 'svg');
    icono.setAttribute('viewBox', '0 0 24 24');
    icono.setAttribute('class', 'skill-icon');
    icono.setAttribute('aria-hidden', 'true');
    const figura = document.createElementNS(svgNS, 'path');
    figura.setAttribute('d', trazado);
    figura.setAttribute('fill', 'none');
    figura.setAttribute('stroke', 'currentColor');
    figura.setAttribute('stroke-width', '1.5');
    figura.setAttribute('stroke-linejoin', 'round');
    icono.append(figura);
    tarjeta.append(icono, elemento('h3', nombre), elemento('p', descripcion));
    document.querySelector('#lista-habilidades').append(tarjeta);
  });
}

// El filtro se aplica al listado local, sin enviar el formulario ni recargar la página.
const filtros = document.querySelector('#filtros');
const lista = document.querySelector('#lista-evidencias');
const estado = document.querySelector('#estado-evidencias');

function mostrarEvidencias(unidad) {
  const visibles = evidenciasAprobadas.filter(evidencia => !unidad || evidencia.unidad === unidad);
  lista.replaceChildren();
  lista.hidden = !visibles.length;
  estado.classList.toggle('empty', !visibles.length);
  estado.textContent = visibles.length
    ? `Evidencias disponibles: ${visibles.length}.`
    : unidad ? `Aún no hay evidencias aprobadas en la Unidad ${unidad} — ${unidades[unidad]}.`
      : 'Aún no hay evidencias aprobadas. Aquí aparecerán los trabajos autorizados para su publicación.';

  visibles.forEach(evidencia => {
    const tarjeta = elemento('article', '', 'card evidence-card');
    const previa = evidencia.vistaPrevia
      ? elemento('img', '', 'evidence-preview')
      : elemento('div', 'Documento académico', 'evidence-preview');
    if (evidencia.vistaPrevia) {
      previa.src = evidencia.vistaPrevia;
      previa.alt = evidencia.textoVistaPrevia || `Vista previa de ${evidencia.titulo}`;
      previa.loading = 'lazy';
    }
    tarjeta.append(previa, elemento('h3', evidencia.titulo),
      elemento('p', `Unidad ${evidencia.unidad} — ${unidades[evidencia.unidad]} · ${evidencia.estudiante}`),
      elemento('p', evidencia.descripcion), elemento('p', `Lo que aprendí: ${evidencia.aprendizaje}`),
      enlace('Ver evidencia', evidencia.archivo, 'button'));
    lista.append(tarjeta);
  });
}

['', ...Object.keys(unidades)].forEach(unidad => {
  const boton = elemento('button', unidad ? `Unidad ${unidad}` : 'Todas');
  boton.type = 'button';
  boton.dataset.unidad = unidad;
  boton.setAttribute('aria-pressed', String(!unidad));
  filtros.append(boton);
});
filtros.addEventListener('click', evento => {
  const boton = evento.target.closest('button[data-unidad]');
  if (!boton) return;
  filtros.querySelectorAll('button').forEach(opcion => opcion.setAttribute('aria-pressed', String(opcion === boton)));
  mostrarEvidencias(boton.dataset.unidad);
});

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
matchMedia('(min-width: 1100px)').addEventListener('change', () => abrirMenu(false));

document.querySelector('[data-year]').textContent = new Date().getFullYear();
mostrarEquipo();
mostrarHabilidades();
mostrarEvidencias('');
