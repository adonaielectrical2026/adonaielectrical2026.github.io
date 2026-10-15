(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('service-theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const isEnglish = root.lang.toLowerCase().startsWith('en');
  const serviceByPath = {
    '/servicios/proyectos-electricos-en-salto/': 'proyectos',
    '/servicios/remodelaciones-electricas-en-salto/': 'remodelaciones',
    '/servicios/mantenimiento-electrico-en-salto/': 'mantenimiento',
    '/servicios/electricista-de-emergencia-en-salto/': 'emergencias',
    '/servicios/iluminacion-de-emergencia-en-salto/': 'iluminacion',
    '/servicios/tramites-ute-en-salto/': 'tramites',
    '/servicios/instalacion-camaras-seguridad-en-salto/': 'camaras',
    '/en/services/electrical-projects-in-salto/': 'proyectos',
    '/en/services/electrical-renovations-in-salto/': 'remodelaciones',
    '/en/services/electrical-maintenance-in-salto/': 'mantenimiento',
    '/en/services/emergency-electrician-in-salto/': 'emergencias',
    '/en/services/emergency-lighting-in-salto/': 'iluminacion',
    '/en/services/ute-procedures-in-salto/': 'tramites',
    '/en/services/security-camera-installation-in-salto/': 'camaras'
  };

  const normalizedPath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  const currentService = serviceByPath[normalizedPath];

  if (currentService) {
    const quoteUrl = `${isEnglish ? '/en/' : '/'}?servicio=${encodeURIComponent(currentService)}#contacto`;
    document.querySelectorAll('a[href="/#contacto"], a[href="/en/#contacto"]').forEach(link => {
      link.href = quoteUrl;
    });
  }

  function applyTheme(theme, save = false) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';

    if (toggle) {
      const label = isEnglish
        ? (isDark ? 'Enable light mode' : 'Enable dark mode')
        : (isDark ? 'Activar modo claro' : 'Activar modo oscuro');
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    }

    themeColor?.setAttribute('content', isDark ? '#0b0c0e' : '#ffffff');

    if (save) {
      try {
        localStorage.setItem('adonai-theme', isDark ? 'dark' : 'light');
      } catch (error) {
        // El sitio sigue funcionando aunque el navegador bloquee el almacenamiento local.
      }
    }
  }

  applyTheme(root.dataset.theme || 'light');

  toggle?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
})();
