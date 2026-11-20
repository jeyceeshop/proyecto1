// Aplicar la preferencia antes de pintar la página.
(() => {
  const clave = 'proyecto1-tema';
  let tema = 'oscuro';
  try {
    if (localStorage.getItem(clave) === 'claro') tema = 'claro';
  } catch {
    // El cambio todavía funciona mientras se navega dentro de la página.
  }

  function aplicarTema() {
    document.documentElement.dataset.theme = tema;
  }

  aplicarTema();
  document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('[data-theme-toggle]');
    if (!boton) return;
    boton.hidden = false;
    boton.setAttribute('aria-pressed', String(tema === 'claro'));
    boton.addEventListener('click', () => {
      tema = tema === 'claro' ? 'oscuro' : 'claro';
      aplicarTema();
      boton.setAttribute('aria-pressed', String(tema === 'claro'));
      try {
        localStorage.setItem(clave, tema);
      } catch {
        // Algunos navegadores restringen el almacenamiento local.
      }
    });
  });
})();
