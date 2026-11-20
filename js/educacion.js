(() => {
  'use strict';
  const amenazas = [
    ['Phishing', 'Mensaje o sitio engañoso que intenta obtener información confidencial.', 'Una alerta ficticia pide volver a iniciar sesión para conservar el acceso al correo.', 'Pérdida del control de la cuenta.', 'Entra a la plataforma desde un marcador conocido y revisa las notificaciones ahí.'],
    ['Malware', 'Software malicioso que puede dañar dispositivos, espiar o alterar información.', 'Un supuesto instalador gratuito incluye un programa que modifica el equipo.', 'Robo de datos o funcionamiento irregular.', 'Instala programas desde fuentes oficiales y mantén las protecciones activas.'],
    ['Ransomware', 'Malware que bloquea el acceso a un sistema o cifra los archivos y exige un pago.', 'Una oficina descubre que sus documentos compartidos ya no se pueden abrir.', 'Interrupción del trabajo y posible pérdida de archivos.', 'Mantén copias de seguridad independientes y comprueba que se puedan restaurar.'],
    ['Robo de identidad', 'Uso de información personal para hacerse pasar por otra persona.', 'Alguien crea un perfil usando el nombre y la foto de un compañero.', 'Fraude o daño reputacional.', 'Limita los datos que publicas y reporta las cuentas que te suplanten.'],
    ['Ingeniería social', 'Manipulación que aprovecha la confianza, la autoridad o la presión.', 'Una persona se presenta como soporte y pide un código de verificación.', 'Acceso indebido a cuentas o información.', 'Confirma las solicitudes por un canal oficial y conserva el código en privado.'],
    ['Enlaces fraudulentos', 'Direcciones que llevan a páginas engañosas o descargas peligrosas.', 'Un enlace de un supuesto envío dirige a un sitio ajeno a la empresa de mensajería.', 'Robo de credenciales, cobros indebidos o descargas peligrosas.', 'Busca el servicio por tu cuenta y verifica el dominio antes de continuar.'],
  ];
  const protecciones = [
    ['Usa contraseñas únicas', 'Crea contraseñas largas y distintas para cada cuenta. Un gestor te ayuda a guardarlas.'],
    ['Activa un segundo factor', 'Configura autenticación multifactor para añadir una comprobación al inicio de sesión.'],
    ['Verifica remitentes y dominios', 'Revisa la dirección completa y confirma solicitudes inesperadas por otro canal.'],
    ['Evita enlaces sospechosos', 'Abre la aplicación o el sitio legítimo desde un marcador o una dirección conocida.'],
    ['Instala actualizaciones', 'Activa las actualizaciones del sistema, navegador y aplicaciones para recibir correcciones.'],
    ['Haz copias de seguridad', 'Conserva una copia separada de los archivos importantes y prueba su restauración.'],
    ['Protege tus códigos', 'Mantén en privado los códigos de verificación aunque alguien diga ser parte de soporte.'],
    ['Consulta fuentes oficiales', 'Busca avisos en canales conocidos de la institución o de un organismo de ciberseguridad.'],
  ];
  const glosario = [
    ['Ciberseguridad', 'Prácticas para proteger sistemas, cuentas y datos frente a incidentes digitales.'],
    ['Amenaza digital', 'Situación, actor o acción con capacidad de afectar información o servicios digitales.'],
    ['Vulnerabilidad', 'Debilidad que puede permitir que una amenaza cause daño.'],
    ['Phishing', 'Engaño que intenta conseguir información o una acción mediante mensajes o sitios fraudulentos.'],
    ['Malware', 'Programa creado para causar daño, espiar o realizar acciones sin autorización.'],
    ['Ransomware', 'Tipo de malware que bloquea o cifra información y exige un rescate.'],
    ['Inteligencia artificial', 'Sistemas que pueden producir predicciones, recomendaciones u otros resultados a partir de datos y objetivos.'],
    ['Detección de anomalías', 'Identificación de comportamientos que se apartan de lo esperado y merecen revisión.'],
    ['Autenticación multifactor', 'Comprobación de identidad mediante dos o más factores de distinta clase.'],
    ['Protección de datos', 'Medidas para resguardar la información personal y controlar cómo se usa y comparte.'],
  ];
  const iconos = [
    'M3 5h18v14H3z M3 6l9 7 9-7', 'M5 4h14v12H5z M8 20h8m-4-4v4 M9 8h6m-3-2v6',
    'M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3 M12 14v3',
    'M3 5h18v14H3z M7 16c0-3 6-3 6 0 M10 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M15 10h3m-3 4h3',
    'M4 5h16v11h-9l-5 4v-4H4z M8 9h8m-8 4h5', 'M10 8l3-3a4 4 0 0 1 6 6l-3 3m-2 2-3 3a4 4 0 0 1-6-6l3-3m1 5 6-6',
    'M8 10a4 4 0 1 1 4 4l-3 6H5v-4l4-4', 'M12 3l8 3v6c0 5-5 8-8 9-3-1-8-4-8-9V6z M8 12l3 3 5-6',
  ];

  const indicadores = {
    password: 'Solicitud de contraseña',
    dominio: 'Dominio que imita una marca',
    urgencia: 'Urgencia excesiva',
    adjunto: 'Archivo adjunto inesperado',
    datos: 'Solicitud de datos confidenciales',
    promesa: 'Promesa poco realista',
  };
  // Los ejemplos son ficticios y los dominios .invalid se muestran como texto.
  const casos = [
    { nombre: 'Aviso del aula virtual', origen: 'Remitente simulado · cuenta@campus-ayuda.invalid',
      mensaje: 'Tu acceso al aula caduca en cinco minutos. Para conservarlo, responde con tu contraseña.',
      senales: { password: 'El aviso pide revelar la contraseña por correo.', urgencia: 'Impone cinco minutos para presionar una respuesta.' },
      consejo: 'Entra al aula desde la dirección que ya conoces y confirma el aviso con soporte.' },
    { nombre: 'Recibo de un pedido', origen: 'Correo ficticio · tienda@recibos.invalid',
      mensaje: 'Te adjuntamos el recibo de tu compra. No recuerdas haber pedido nada. El mensaje menciona un archivo llamado «Recibo».',
      senales: { adjunto: 'El supuesto recibo llega como archivo de una compra que no reconoces.' },
      consejo: 'Revisa el historial de compras en la aplicación oficial antes de abrir adjuntos.' },
    { nombre: 'Enlace de la biblioteca', origen: 'Mensaje ficticio · Biblioteca Horizonte',
      mensaje: 'Dirección que conoces: biblioteca-horizonte.invalid. Dirección en el mensaje: biblioteca-h0rizonte.invalid. El mensaje invita a consultar el catálogo.',
      senales: { dominio: 'El segundo dominio sustituye la letra o por un cero.' },
      consejo: 'Abre el catálogo desde tu marcador habitual y confirma cualquier cambio de dominio.' },
    { nombre: 'Solicitud de soporte', origen: 'Chat ficticio · supuesto personal técnico',
      mensaje: 'Para validar tu cuenta, comparte tu contraseña y el código de verificación que acabas de recibir.',
      senales: { password: 'El supuesto soporte pide tu contraseña.', datos: 'El código de verificación sirve para acceder a tu cuenta y es confidencial.' },
      consejo: 'Conserva el código y contacta a soporte desde sus canales oficiales.' },
    { nombre: 'Alerta de entrega', origen: 'Mensaje de texto ficticio',
      mensaje: 'Confirma tu número de identificación y los datos de tu tarjeta en los próximos tres minutos o se cancelará tu entrega.',
      senales: { datos: 'El mensaje solicita información sensible para una supuesta entrega.', urgencia: 'El límite de tres minutos busca que actúes antes de verificar.' },
      consejo: 'Consulta el número de seguimiento en la aplicación oficial de mensajería.' },
    { nombre: 'Promoción instantánea', origen: 'Anuncio ficticio en una red social',
      mensaje: 'Ganaste un teléfono aunque no participaste. Envía los datos de tu tarjeta antes de un minuto para reclamarlo.',
      senales: { promesa: 'El anuncio ofrece un premio sin participación previa.', datos: 'La tarjeta contiene información financiera que el anuncio intenta obtener.', urgencia: 'El plazo de un minuto presiona al visitante.' },
      consejo: 'Verifica las condiciones en el sitio oficial de la marca y reporta anuncios sospechosos.' },
  ];

  const $ = selector => document.querySelector(selector);
  function crear(etiqueta, texto, clase) {
    const nodo = document.createElement(etiqueta);
    if (texto) nodo.textContent = texto;
    if (clase) nodo.className = clase;
    return nodo;
  }
  function icono(trazo) {
    const espacio = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(espacio, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'skill-icon');
    svg.setAttribute('aria-hidden', 'true');
    const figura = document.createElementNS(espacio, 'path');
    Object.entries({ d: trazo, fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' })
      .forEach(([atributo, valor]) => figura.setAttribute(atributo, valor));
    svg.append(figura);
    return svg;
  }

  amenazas.forEach(([nombre, descripcion, ejemplo, consecuencia, consejo], indice) => {
    const tarjeta = crear('article', '', 'card skill-card');
    tarjeta.append(icono(iconos[indice]), crear('h4', nombre), crear('p', descripcion));
    const detalles = crear('dl', '', 'threat-details');
    [['Ejemplo', ejemplo], ['Posible consecuencia', consecuencia], ['Prevención', consejo]].forEach(([titulo, texto]) => {
      detalles.append(crear('dt', titulo), crear('dd', texto));
    });
    tarjeta.append(detalles);
    $('#tarjetas-amenazas').append(tarjeta);
  });
  protecciones.forEach(([titulo, texto], indice) => {
    const tarjeta = crear('article', '', 'card skill-card');
    tarjeta.append(icono(iconos[(indice + 6) % iconos.length]), crear('h4', titulo), crear('p', texto));
    $('#tarjetas-proteccion').append(tarjeta);
  });
  glosario.forEach(([termino, significado]) => {
    const entrada = crear('details', '', 'card');
    entrada.append(crear('summary', termino), crear('p', significado));
    $('#glosario-lista').append(entrada);
  });

  const formulario = $('#lab-form');
  const selector = $('#lab-caso');
  const resultado = $('#lab-resultado');
  const tituloResultado = $('#lab-resultado-titulo');
  casos.forEach((caso, indice) => selector.add(new Option(caso.nombre, indice)));
  Object.entries(indicadores).forEach(([clave, texto]) => {
    const etiqueta = crear('label', texto);
    const opcion = crear('input');
    opcion.type = 'checkbox';
    opcion.name = 'indicador';
    opcion.value = clave;
    etiqueta.prepend(opcion);
    $('#lab-indicadores').append(etiqueta);
  });

  function mostrarCaso() {
    const caso = casos[selector.selectedIndex];
    $('#lab-mensaje-titulo').textContent = caso.nombre;
    $('#lab-mensaje-origen').textContent = caso.origen;
    $('#lab-mensaje-cuerpo').textContent = caso.mensaje;
    formulario.querySelectorAll('input').forEach(opcion => { opcion.checked = false; });
    resultado.hidden = true;
  }

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const caso = casos[selector.selectedIndex];
    const seleccion = new Set(new FormData(formulario).getAll('indicador'));
    const esperadas = Object.keys(caso.senales);
    const aciertos = esperadas.filter(clave => seleccion.has(clave));
    const adicionales = [...seleccion].filter(clave => !Object.hasOwn(caso.senales, clave));
    const nivel = ['Pocas señales', 'Precaución', 'Múltiples señales'][esperadas.length - 1];

    tituloResultado.textContent = 'Resultado · ' + caso.nombre;
    $('#lab-nivel').textContent = 'Nivel orientativo del caso: ' + nivel;
    resultado.dataset.nivel = String(esperadas.length);
    $('#lab-explicacion').textContent = `Identificaste ${aciertos.length} de ${esperadas.length} señales del caso.`;
    const detalle = esperadas.map(clave => crear('li',
      `${seleccion.has(clave) ? 'Identificada' : 'Por reconocer'} · ${indicadores[clave]}: ${caso.senales[clave]}`));
    if (adicionales.length) {
      detalle.push(crear('li', 'Otras señales marcadas que este ejemplo no muestra: ' + adicionales.map(clave => indicadores[clave]).join(', ') + '.'));
    }
    $('#lab-detalle').replaceChildren(...detalle);
    $('#lab-recomendacion').textContent = 'Recomendación: ' + caso.consejo;
    resultado.hidden = false;
    tituloResultado.focus();
  });
  selector.addEventListener('change', mostrarCaso);
  $('#lab-otro').addEventListener('click', () => {
    selector.selectedIndex = (selector.selectedIndex + 1) % casos.length;
    mostrarCaso();
    selector.focus();
  });
  mostrarCaso();
  formulario.hidden = false;
})();
