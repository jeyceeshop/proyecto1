import { conectarSupabase } from './supabase-config.js';

const $ = selector => document.querySelector(selector);
const estados = { pending: 'Pendiente', approved: 'Aprobada', rejected: 'Rechazada' };
const unidades = ['I', 'II', 'III', 'IV', 'V'];
const originales = 'evidencias-originales';
const publicaciones = 'evidencias-publicadas';
const limite = 10 * 1024 * 1024;
const editor = $('#editor');
const revision = $('#revision');
const formulario = $('#form-evidencia');
const acceso = $('#login');
const formRevision = $('#form-revision');
const filtroEstudiante = $('#filtro-estudiante');
const filtroUnidad = $('#filtro-unidad');
const filtroEstado = $('#filtro-estado');
let cliente;
let perfil;
let evidencias = [];
let integrantes = [];
let editando;
let revisando;
let decision;
let operacionEnCurso = false;

function nodo(tag, texto, clase) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

function informar(texto, selector = '#portal-status', error = false) {
  const estado = $(selector);
  estado.textContent = texto;
  estado.classList.toggle('status-error', error);
}

function valor(resultado) {
  if (resultado.error) throw resultado.error;
  return resultado.data;
}

function boton(texto, accion) {
  const control = nodo('button', texto, 'button small');
  control.type = 'button';
  control.addEventListener('click', accion);
  return control;
}

async function ejecutar(trabajo, selector = '#portal-status') {
  if (operacionEnCurso) return;
  operacionEnCurso = true;
  informar('Procesando…', selector);
  try {
    await trabajo();
  } catch (error) {
    informar(error.message || 'Ocurrió un error inesperado.', selector, true);
  } finally {
    operacionEnCurso = false;
  }
}

async function cargarPanel() {
  const nuevas = valor(await cliente.from('evidences').select('*').order('created_at', { ascending: false }));
  const equipo = perfil.role === 'coordinator'
    ? valor(await cliente.from('profiles').select('id,full_name').order('full_name'))
    : [perfil];

  evidencias = nuevas;
  integrantes = equipo;
  const propias = evidencias.filter(item => item.student_id === perfil.id);
  $('#mis-estadisticas').replaceChildren(...estadisticas(propias));
  $('#mis-evidencias').replaceChildren(...tarjetas(propias));

  if (perfil.role === 'coordinator') {
    const seleccionado = filtroEstudiante.value;
    filtroEstudiante.replaceChildren(new Option('Todos', ''), ...equipo.map(persona => new Option(persona.full_name, persona.id)));
    filtroEstudiante.value = equipo.some(persona => persona.id === seleccionado) ? seleccionado : '';
    $('#equipo-estadisticas').replaceChildren(datoEstadistica('Integrantes', equipo.length), ...estadisticas(evidencias));
    mostrarRevision();
  }
}

function datoEstadistica(etiqueta, cantidad) {
  const grupo = nodo('div', '', 'card');
  grupo.append(nodo('dt', etiqueta), nodo('dd', String(cantidad)));
  return grupo;
}

function estadisticas(items) {
  return [
    datoEstadistica('Total', items.length),
    ...Object.entries(estados).map(([estado, etiqueta]) =>
      datoEstadistica(etiqueta + 's', items.filter(item => item.status === estado).length)),
  ];
}

function mostrarRevision() {
  const visibles = evidencias.filter(item =>
    (!filtroEstudiante.value || item.student_id === filtroEstudiante.value)
    && (!filtroUnidad.value || item.unit === filtroUnidad.value)
    && (!filtroEstado.value || item.status === filtroEstado.value));
  $('#equipo-evidencias').replaceChildren(...tarjetas(visibles, true));
}

function tarjetas(items, coordinacion = false) {
  if (!items.length) return [nodo('p', 'No hay evidencias para mostrar.', 'portal-status')];
  return items.map(item => {
    const tarjeta = nodo('article', '', 'card');
    const autor = integrantes.find(persona => persona.id === item.student_id)?.full_name || 'Integrante';
    const fecha = new Intl.DateTimeFormat('es-PA', { dateStyle: 'medium' }).format(new Date(item.created_at));
    const acciones = nodo('div', '', 'panel-actions');
    const archivo = nodo('a', 'Ver archivo', 'button small');
    // La URL se crea bajo demanda y expira después de revisar el original.
    archivo.href = '#portal-status';
    archivo.addEventListener('click', evento => {
      evento.preventDefault();
      ejecutar(async () => {
        const { signedUrl } = valor(await cliente.storage.from(originales).createSignedUrl(item.file_path, 90));
        informar('Abriendo el archivo en esta pestaña.');
        window.location.assign(signedUrl);
      });
    });
    acciones.append(archivo);
    tarjeta.append(nodo('h4', item.title), nodo('p', `Unidad ${item.unit} · ${autor} · ${fecha}`),
      nodo('p', `${estados[item.status]} · ${item.file_name}`, `badge-${item.status}`),
      nodo('p', item.description), nodo('p', `Lo que aprendí: ${item.learning}`));
    if (item.rejection_reason) tarjeta.append(nodo('p', `Motivo: ${item.rejection_reason}`));
    if (!coordinacion && item.status !== 'approved') acciones.append(boton('Editar', () => abrirEditor(item)));
    if (!coordinacion && item.status === 'pending') acciones.append(boton('Eliminar', () => eliminar(item)));
    if (coordinacion && item.status === 'pending') {
      acciones.append(boton('Aprobar', () => abrirRevision(item, 'approved')),
        boton('Rechazar', () => abrirRevision(item, 'rejected')));
    }
    if (coordinacion && item.status === 'approved') {
      acciones.append(boton('Retirar publicación', () => abrirRevision(item, 'rejected')));
    }
    tarjeta.append(acciones);
    return tarjeta;
  });
}

function abrirEditor(item) {
  editando = item;
  formulario.reset();
  informar('', '#editor-estado');
  $('#editor-titulo').textContent = item ? 'Editar evidencia' : 'Nueva evidencia';
  $('#campo-archivo').hidden = Boolean(item);
  formulario.elements.archivo.required = !item;
  if (item) {
    formulario.elements.titulo.value = item.title;
    formulario.elements.unidad.value = item.unit;
    formulario.elements.descripcion.value = item.description;
    formulario.elements.aprendizaje.value = item.learning;
  }
  editor.showModal();
}

async function verificarArchivo(archivo) {
  if (!archivo?.size || archivo.size > limite) throw new Error('El archivo debe ocupar entre 1 byte y 10 MB.');
  const bytes = new Uint8Array(await archivo.slice(0, 12).arrayBuffer());
  const cabecera = new TextDecoder('latin1').decode(bytes);
  const formato = {
    'application/pdf': cabecera.startsWith('%PDF-'),
    'image/jpeg': bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    'image/png': [137,80,78,71,13,10,26,10].every((byte, indice) => bytes[indice] === byte),
    'image/webp': cabecera.startsWith('RIFF') && cabecera.slice(8,12) === 'WEBP',
  };
  if (!Object.hasOwn(formato, archivo.type) || !formato[archivo.type]) {
    throw new Error('Selecciona un PDF, JPEG, PNG o WEBP válido.');
  }
}

async function guardar() {
  if (!perfil) throw new Error('Vuelve a iniciar sesión.');
  const datos = new FormData(formulario);
  const parametros = {
    evidence_id: editando?.id || crypto.randomUUID(),
    evidence_title: datos.get('titulo').trim(),
    evidence_unit: datos.get('unidad'),
    evidence_description: datos.get('descripcion').trim(),
    evidence_learning: datos.get('aprendizaje').trim(),
  };
  if (!parametros.evidence_title || !parametros.evidence_description || !parametros.evidence_learning) {
    throw new Error('Completa el título, la descripción y lo que aprendiste.');
  }
  if (editando) {
    valor(await cliente.rpc('edit_evidence', parametros));
  } else {
    const archivo = datos.get('archivo');
    await verificarArchivo(archivo);
    const usuario = valor(await cliente.auth.getUser()).user;
    if (usuario?.id !== perfil.id) throw new Error('Vuelve a iniciar sesión.');
    const ruta = `${usuario.id}/${parametros.evidence_id}`;
    valor(await cliente.storage.from(originales).upload(ruta, archivo, { contentType: archivo.type }));
    const guardado = await cliente.rpc('submit_evidence', {
      ...parametros, original_name: archivo.name, mime_type: archivo.type,
    });
    if (guardado.error) {
      const consulta = await cliente.from('evidences').select('id').eq('id', parametros.evidence_id).maybeSingle();
      if (!consulta.data) {
        if (consulta.error) throw new Error('No se pudo confirmar el guardado. Actualiza la lista antes de volver a cargar el archivo.');
        const limpieza = await cliente.storage.from(originales).remove([ruta]);
        if (limpieza.error) throw new Error(`Falló el registro y no se pudo limpiar la carga de ${ruta}.`);
        throw guardado.error;
      }
    }
  }
  editor.close();
  await actualizarTrasCambio('Evidencia guardada como pendiente.');
}

async function actualizarTrasCambio(mensaje) {
  try {
    await cargarPanel();
    informar(mensaje);
  } catch {
    informar(mensaje + ' Recarga la página para actualizar la lista.');
  }
}

function eliminar(item) {
  if (!window.confirm(`¿Eliminar «${item.title}»?`)) return;
  ejecutar(async () => {
    const ruta = valor(await cliente.rpc('delete_pending_evidence', { evidence_id: item.id }));
    const limpieza = await cliente.storage.from(originales).remove([ruta]);
    await actualizarTrasCambio(limpieza.error
      ? `Se retiró la evidencia. Queda por limpiar el archivo privado ${ruta}.` : 'Evidencia eliminada.');
  });
}

function abrirRevision(item, nuevoEstado) {
  revisando = item;
  decision = nuevoEstado;
  const aprobar = nuevoEstado === 'approved';
  formRevision.reset();
  informar('', '#revision-estado');
  $('#revision-titulo').textContent = aprobar ? 'Aprobar y publicar'
    : item.status === 'approved' ? 'Retirar publicación' : 'Rechazar evidencia';
  $('#campo-confirmacion').hidden = !aprobar;
  $('#campo-motivo').hidden = aprobar;
  formRevision.elements.confirmacion.required = aprobar;
  formRevision.elements.motivo.required = !aprobar;
  revision.showModal();
}

async function decidir() {
  const item = revisando;
  const aprobar = decision === 'approved';
  const motivo = formRevision.elements.motivo.value.trim();
  if (!aprobar && !motivo) throw new Error('Escribe el motivo de la decisión.');
  const bucket = cliente.storage.from(publicaciones);
  if (aprobar) {
    // Si un intento anterior dejó una copia privada, se puede reutilizar.
    const copia = await bucket.info(item.id);
    if (copia.error) {
      const archivo = valor(await cliente.storage.from(originales).download(item.file_path));
      valor(await bucket.upload(item.id, archivo, { contentType: item.file_type }));
    }
  }
  valor(await cliente.rpc('review_evidence', {
    evidence_id: item.id, expected_update: item.updated_at, decision, reason: aprobar ? null : motivo,
  }));
  revision.close();
  await actualizarTrasCambio(aprobar ? 'Evidencia aprobada y publicada.' : 'Evidencia rechazada y retirada de la galería.');
}

async function mostrarSesion(sesion) {
  $('#acceso').hidden = Boolean(sesion);
  $('#panel').hidden = true;
  perfil = null;
  $('#mis-evidencias').replaceChildren();
  $('#equipo-evidencias').replaceChildren();
  $('#bienvenida').textContent = '';
  evidencias = [];
  integrantes = [];
  if (!sesion) {
    informar('Inicia sesión con la cuenta asignada.');
    return;
  }
  perfil = valor(await cliente.from('profiles').select('id,full_name,role').eq('id', sesion.user.id).maybeSingle());
  if (!perfil) {
    valor(await cliente.auth.signOut());
    $('#acceso').hidden = false;
    informar('La cuenta aún no tiene un perfil autorizado. Consulta al coordinador.', '#portal-status', true);
    return;
  }
  $('#bienvenida').textContent = `Bienvenido, ${perfil.full_name}`;
  $('#coordinacion').hidden = perfil.role !== 'coordinator';
  await cargarPanel();
  $('#panel').hidden = false;
  informar('');
}

unidades.forEach(unidad => {
  filtroUnidad.add(new Option('Unidad ' + unidad, unidad));
  formulario.elements.unidad.add(new Option('Unidad ' + unidad, unidad));
});
[filtroEstudiante, filtroUnidad, filtroEstado].forEach(control => control.addEventListener('change', mostrarRevision));
document.querySelectorAll('[data-close]').forEach(control => control.addEventListener('click', () => {
  if (!operacionEnCurso) document.getElementById(control.dataset.close).close();
}));
[editor, revision].forEach(dialogo => dialogo.addEventListener('cancel', evento => {
  if (operacionEnCurso) evento.preventDefault();
}));
$('#nueva').addEventListener('click', () => abrirEditor(null));
formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  ejecutar(guardar, '#editor-estado');
});
formRevision.addEventListener('submit', evento => {
  evento.preventDefault();
  ejecutar(decidir, '#revision-estado');
});
acceso.addEventListener('submit', evento => {
  evento.preventDefault();
  ejecutar(async () => {
    const datos = new FormData(acceso);
    const { session } = valor(await cliente.auth.signInWithPassword({
      email: datos.get('correo').trim(), password: datos.get('password'),
    }));
    acceso.reset();
    await mostrarSesion(session);
  });
});
$('#salir').addEventListener('click', () => ejecutar(async () => {
  valor(await cliente.auth.signOut());
  await mostrarSesion(null);
}));

try {
  cliente = await conectarSupabase();
  if (!cliente) informar('El acceso de estudiantes estará disponible cuando se configure Supabase.');
  else {
    await mostrarSesion(valor(await cliente.auth.getSession()).session);
    cliente.auth.onAuthStateChange(evento => {
      if (evento === 'SIGNED_OUT' && perfil) {
        // La sesión también puede cerrarse desde otra pestaña.
        editor.close();
        revision.close();
        mostrarSesion(null);
      }
    });
  }
} catch (error) {
  if (cliente) $('#acceso').hidden = false;
  informar(`No se pudo iniciar el portal: ${error.message}`, '#portal-status', true);
}
