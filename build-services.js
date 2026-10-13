#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = __dirname;
const site = 'https://adonaielectrical2026.github.io';
const updated = '2026-10-13';

const services = [
  {
    slug: 'proyectos-electricos-en-salto',
    name: 'Proyectos eléctricos en Salto',
    short: 'Proyectos nuevos',
    description: 'Planificación, presupuesto e instalación eléctrica para viviendas, comercios, industrias, ampliaciones y obras nuevas en Salto.',
    image: 'shekina-fachada-portada.webp',
    hero: {
      src: 'shekina-fachada-portada.webp',
      alt: 'Fachada iluminada del Salón de Fiestas y Eventos SHEKINA en Salto',
      className: 'service-page-visual--landscape',
      width: 1600,
      height: 960
    },
    intro: 'Desarrollamos soluciones eléctricas para obras nuevas y ampliaciones, considerando el uso previsto de cada espacio, las cargas necesarias y las condiciones técnicas del proyecto.',
    items: ['Revisión de planos y necesidades', 'Definición del alcance eléctrico', 'Canalizaciones, tableros y puntos eléctricos', 'Iluminación general y coordinación de obra'],
    search: 'proyecto eléctrico en Salto',
    evidence: {
      title: 'Canalizaciones ejecutadas durante una obra nueva.',
      description: 'Registros reales de la distribución de cañerías y puntos eléctricos antes de las terminaciones.',
      images: [
        { src: 'proyecto-canalizacion-techo.webp', alt: 'Canalizaciones eléctricas distribuidas sobre la estructura del techo de una obra', title: 'Distribución en techo', caption: 'Recorrido de cañerías previo al cierre de la obra.' },
        { src: 'proyecto-distribucion-canos.webp', alt: 'Detalle de varias cañerías eléctricas instaladas bajo una cubierta metálica', title: 'Detalle de canalizaciones', caption: 'Conducciones organizadas hacia los distintos sectores.' },
        { src: 'proyecto-vista-general.webp', alt: 'Vista general de una obra con las canalizaciones eléctricas instaladas', title: 'Vista general de obra', caption: 'Instalación eléctrica documentada durante la ejecución.' }
      ]
    },
    project: 'shekina'
  },
  {
    slug: 'remodelaciones-electricas-en-salto',
    name: 'Remodelaciones eléctricas en Salto',
    short: 'Remodelaciones',
    description: 'Modificación y adecuación de instalaciones eléctricas para reformas residenciales, comerciales e industriales en Salto.',
    image: 'iluminacion-geometrica.webp',
    intro: 'Adaptamos instalaciones existentes a nuevas distribuciones, usos y necesidades de iluminación, evaluando previamente el estado de los circuitos y protecciones.',
    items: ['Modificación de puntos eléctricos', 'Adecuación de circuitos y tableros', 'Renovación de iluminación', 'Coordinación con reformas y terminaciones'],
    search: 'remodelación eléctrica en Salto',
    evidence: {
      title: 'Iluminación renovada en espacios interiores.',
      description: 'Ejemplos reales de luminarias instaladas y puestas en funcionamiento durante trabajos de adecuación.',
      images: [
        { src: 'remodelacion-downlight.webp', alt: 'Plafón LED encendido después de su instalación en un ambiente interior', title: 'Plafón LED', caption: 'Iluminación general instalada y en funcionamiento.', position: 'top' },
        { src: 'iluminacion-tejida.webp', alt: 'Luminaria colgante con pantalla tejida encendida', title: 'Luminaria colgante', caption: 'Montaje y puesta en funcionamiento.' },
        { src: 'iluminacion-geometrica.webp', alt: 'Luminaria geométrica encendida después de su instalación', title: 'Detalle decorativo', caption: 'Terminación de iluminación interior.' }
      ]
    }
  },
  {
    slug: 'mantenimiento-electrico-en-salto',
    name: 'Mantenimiento eléctrico en Salto',
    short: 'Mantenimiento',
    description: 'Diagnóstico, mantenimiento preventivo y reparaciones eléctricas para viviendas, comercios e industrias en Salto.',
    image: 'protecciones.webp',
    intro: 'Revisamos fallas, desgaste y condiciones de funcionamiento para definir las reparaciones o tareas preventivas que requiere cada instalación.',
    items: ['Diagnóstico de fallas', 'Revisión de tableros y protecciones', 'Reparaciones y sustituciones', 'Mantenimiento preventivo y correctivo'],
    search: 'mantenimiento eléctrico en Salto',
    evidence: {
      title: 'Registros para diagnóstico y mantenimiento.',
      description: 'Documentamos el estado encontrado antes de definir las reparaciones o sustituciones necesarias.',
      note: 'Las fotografías muestran condiciones previas al acondicionamiento; no representan la terminación del trabajo.',
      images: [
        { src: 'protecciones.webp', alt: 'Protecciones y conductores dentro de un gabinete antes del acondicionamiento', title: 'Protecciones eléctricas', caption: 'Revisión del estado de un gabinete existente.' },
        { src: 'luminaria-exterior.webp', alt: 'Luminaria exterior con una rotura visible en su carcasa', title: 'Daño en luminaria exterior', caption: 'Registro previo a la intervención.' },
        { src: 'luminaria-desprendida.webp', alt: 'Luminaria exterior desprendida de su base sobre el césped', title: 'Punto a acondicionar', caption: 'Evaluación de una luminaria desprendida.' }
      ]
    }
  },
  {
    slug: 'electricista-de-emergencia-en-salto',
    name: 'Electricista de emergencia en Salto',
    short: 'Emergencias eléctricas',
    description: 'Atención de emergencias eléctricas las 24 horas en Salto para evaluar fallas, interrupciones y situaciones de riesgo.',
    image: 'portada-emergencia.webp',
    intro: 'Atendemos imprevistos eléctricos para identificar el origen del problema, evaluar las alternativas disponibles y restablecer condiciones seguras cuando el caso lo permite.',
    items: ['Fallas e interrupciones inesperadas', 'Problemas en tableros y protecciones', 'Evaluación de riesgos eléctricos', 'Atención las 24 horas, todos los días'],
    search: 'electricista de emergencia en Salto'
  },
  {
    slug: 'iluminacion-de-emergencia-en-salto',
    name: 'Iluminación de emergencia en Salto',
    short: 'Iluminación de emergencia',
    description: 'Instalación y revisión de luminarias de emergencia en Salto para viviendas, comercios, industrias y procesos ante DNB.',
    image: 'iluminacion-emergencia.webp',
    intro: 'Instalamos luminarias de emergencia y realizamos adecuaciones eléctricas asociadas, de acuerdo con el alcance técnico definido para cada inmueble.',
    items: ['Instalación de luminarias de emergencia', 'Revisión de alimentación y funcionamiento', 'Adecuaciones eléctricas asociadas', 'Coordinación con el alcance del proceso ante DNB'],
    search: 'iluminación de emergencia en Salto',
    customPage: true
  },
  {
    slug: 'tramites-ute-en-salto',
    name: 'Trámites ante UTE en Salto',
    short: 'Trámites ante UTE',
    description: 'Asesoramiento técnico y acompañamiento para solicitudes de suministro, rehabilitación y cambios de potencia ante UTE en Salto.',
    image: 'shekina-ute-medidor-y-salon.jpeg',
    hero: {
      src: 'shekina-ute-gabinete-exterior.jpeg',
      alt: 'Gabinete de medida exterior instalado para el Salón de Fiestas y Eventos SHEKINA'
    },
    intro: 'Acompañamos la preparación técnica de gestiones vinculadas a instalaciones eléctricas, definiendo primero qué intervención corresponde en cada caso.',
    items: ['Solicitud de suministro', 'Solicitud de rehabilitación', 'Modificación de potencia contratada', 'Evaluación de adecuaciones necesarias'],
    search: 'trámites UTE en Salto',
    evidence: {
      eyebrow: 'Trabajo documentado',
      title: 'Solicitud de suministro para el Salón SHEKINA.',
      description: 'Registros del punto de medida exterior y de las protecciones asociadas al suministro solicitado para el salón de fiestas y eventos.',
      images: [
        { src: 'shekina-ute-medidor-y-salon.jpeg', alt: 'Medidor exterior instalado con el Salón de Fiestas y Eventos SHEKINA al fondo', title: 'Contexto de la instalación', caption: 'Punto de medida exterior con el Salón SHEKINA al fondo.' },
        { src: 'shekina-ute-gabinete-exterior.jpeg', alt: 'Gabinete de medida exterior y canalización instalados sobre una columna', title: 'Gabinete de medida', caption: 'Vista del conjunto exterior instalado.', position: 'top' },
        { src: 'ute-protecciones.webp', alt: 'Interruptor y protecciones eléctricas instaladas dentro de un gabinete', title: 'Protecciones', caption: 'Detalle técnico del conjunto de protección.' }
      ]
    }
  },
  {
    slug: 'instalacion-camaras-seguridad-en-salto',
    name: 'Instalación de cámaras de seguridad en Salto',
    short: 'Cámaras de seguridad',
    description: 'Instalación de cámaras de seguridad y sistemas de videovigilancia para viviendas, comercios e industrias en Salto.',
    image: 'camara-terminada.webp',
    intro: 'Instalamos sistemas de videovigilancia con una ubicación planificada de cámaras, tendido protegido y configuración inicial según las necesidades del lugar.',
    items: ['Evaluación de zonas a supervisar', 'Instalación y orientación de cámaras', 'Cableado, alimentación y conexiones', 'Configuración inicial y verificación del sistema'],
    search: 'instalación de cámaras en Salto',
    evidence: {
      title: 'Instalación exterior documentada paso a paso.',
      description: 'Canalización, conexiones protegidas y cámara instalada en su ubicación final.',
      images: [
        { src: 'camara-cableado.webp', alt: 'Cableado de alimentación y datos tendido hacia el punto de la cámara', title: 'Canalización', caption: 'Tendido hasta el punto de instalación.' },
        { src: 'camara-conexion.webp', alt: 'Conexiones protegidas dentro de una caja de paso', title: 'Conexiones', caption: 'Terminación dentro de la caja de paso.' },
        { src: 'camara-terminada.webp', alt: 'Cámara de seguridad instalada y orientada en el exterior de una vivienda', title: 'Instalación terminada', caption: 'Cámara conectada y orientada.' }
      ]
    }
  }
];

const esc = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function page(service) {
  const url = `${site}/servicios/${service.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.short,
        description: service.description,
        url,
        image: `${site}/${service.image}`,
        areaServed: { '@type': 'City', name: 'Salto', addressCountry: 'UY' },
        provider: {
          '@type': 'Electrician',
          '@id': `${site}/#business`,
          name: 'ADONAI ELECTRICAL',
          telephone: '+598 98 152 423',
          email: 'adonaielectrical2026@gmail.com',
          url: site,
          address: { '@type': 'PostalAddress', streetAddress: 'Av. Defensa 1599', addressLocality: 'Salto', addressRegion: 'Salto', addressCountry: 'UY' }
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${site}/#servicios` },
          { '@type': 'ListItem', position: 3, name: service.short, item: url }
        ]
      }
    ]
  };

  const related = services.filter(item => item.slug !== service.slug).slice(0, 3);
  const evidence = service.evidence ? `
    <section class="section service-page-evidence" aria-labelledby="evidence-${service.slug}">
      <div class="container">
        <header class="service-page-evidence__heading">
          <div><p class="eyebrow">${esc(service.evidence.eyebrow || 'Trabajos realizados')}</p><h2 id="evidence-${service.slug}">${esc(service.evidence.title)}</h2></div>
          <p>${esc(service.evidence.description)}</p>
        </header>
        <div class="service-page-evidence__gallery">
          ${service.evidence.images.map(image => `<figure><a class="service-page-photo-link" href="/${image.src}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${esc(image.title)} en tamaño completo"><img${image.position ? ` class="service-page-photo--${image.position}"` : ''} src="/${image.src}" alt="${esc(image.alt)}" loading="lazy" decoding="async"></a><figcaption><strong>${esc(image.title)}</strong><span>${esc(image.caption)}</span></figcaption></figure>`).join('')}
        </div>
${service.evidence.note ? `        <p class="service-page-evidence__note">${esc(service.evidence.note)}</p>` : ''}
      </div>
    </section>` : '';
  const project = service.project === 'shekina' ? `
    <section class="section service-page-project" aria-labelledby="shekina-project-title">
      <div class="container">
        <header class="service-page-project__heading">
          <div>
            <p class="eyebrow">Proyecto eléctrico inicial · Salto</p>
            <h2 id="shekina-project-title">Instalación eléctrica del Salón de Fiestas y Eventos SHEKINA.</h2>
            <p>El proyecto inicial incluyó la distribución eléctrica del establecimiento, la iluminación general, los tableros de protección y los circuitos destinados a los distintos sectores.</p>
            <p>El tablero general alimenta prácticamente todo el salón. Un tablero secundario independiente abastece la cocina y los baños, facilitando la sectorización y el control de esos consumos.</p>
          </div>
          <span class="service-page-project__status">Proyecto ejecutado</span>
        </header>
        <dl class="service-page-project__metrics" aria-label="Resumen del proyecto eléctrico del Salón SHEKINA">
          <div><dt>2</dt><dd>Tableros de distribución</dd></div>
          <div><dt>1</dt><dd>Tablero general</dd></div>
          <div><dt>1</dt><dd>Tablero secundario</dd></div>
          <div><dt>5</dt><dd>Luminarias de emergencia</dd></div>
        </dl>
        <div class="service-page-project__gallery service-page-project__gallery--shekina">
          <figure class="service-page-project__gallery-featured"><a class="service-page-photo-link" href="/shekina-proyecto-general.webp" target="_blank" rel="noopener noreferrer" aria-label="Abrir vista general de la iluminación del Salón SHEKINA en tamaño completo"><img src="/shekina-proyecto-general.webp" alt="Iluminación general instalada en el Salón de Fiestas y Eventos SHEKINA" width="1600" height="900" loading="lazy" decoding="async"></a><figcaption><strong>Iluminación general</strong><span>Paneles LED instalados como parte del proyecto eléctrico inicial.</span></figcaption></figure>
          <figure><a class="service-page-photo-link" href="/shekina-tablero-general.webp" target="_blank" rel="noopener noreferrer" aria-label="Abrir fotografía del tablero general del Salón SHEKINA en tamaño completo"><img src="/shekina-tablero-general.webp" alt="Tablero general de distribución del Salón de Fiestas y Eventos SHEKINA" width="900" height="1600" loading="lazy" decoding="async"></a><figcaption><strong>Tablero general</strong><span>Distribución principal que alimenta prácticamente todo el salón.</span></figcaption></figure>
          <figure><a class="service-page-photo-link" href="/shekina-tablero-secundario.webp" target="_blank" rel="noopener noreferrer" aria-label="Abrir fotografía del tablero secundario del Salón SHEKINA en tamaño completo"><img src="/shekina-tablero-secundario.webp" alt="Tablero secundario que alimenta la cocina y los baños del Salón SHEKINA" width="900" height="1600" loading="lazy" decoding="async"></a><figcaption><strong>Tablero secundario</strong><span>Alimentación independiente para la cocina y los baños.</span></figcaption></figure>
        </div>
        <div class="service-page-project__cta"><div><h3>Iluminación de emergencia del establecimiento</h3><p>El proyecto también incorporó cinco luminarias autónomas para respaldar las rutas de salida.</p></div><a class="btn" href="/servicios/iluminacion-de-emergencia-en-salto/">Ver instalación de emergencia</a></div>
      </div>
    </section>` : '';

  const hero = service.hero || { src: service.image, alt: `${service.short} — ADONAI ELECTRICAL en Salto` };
  return `<!DOCTYPE html>
<html lang="es-UY">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(service.name)} | ADONAI ELECTRICAL</title>
  <meta name="description" content="${esc(service.description)}">
  <meta name="theme-color" content="#111111">
  <script>
    (() => {
      try {
        const savedTheme = localStorage.getItem('adonai-theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = savedTheme || systemTheme;
      } catch (error) {
        document.documentElement.dataset.theme = 'light';
      }
    })();
  </script>
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_UY">
  <meta property="og:site_name" content="ADONAI ELECTRICAL">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(service.name)} | ADONAI ELECTRICAL">
  <meta property="og:description" content="${esc(service.description)}">
  <meta property="og:image" content="${site}/${service.image}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap">
  <link rel="stylesheet" href="/styles.css">
  <script src="/service-page.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="service-page-body">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="service-page-header">
    <div class="container service-page-header__inner">
      <a class="service-page-brand" href="/" aria-label="ADONAI ELECTRICAL, volver al inicio"><img src="/logo-mark-92.webp" alt="" width="46" height="46"><span class="brand-name">ADONAI ELECTRICAL</span></a>
      <div class="service-page-header__actions">
        <button class="header-tool theme-toggle service-page-theme-toggle" id="service-theme-toggle" type="button" aria-label="Activar modo oscuro" aria-pressed="false" title="Cambiar modo de color">
          <svg class="icon moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>
          <svg class="icon sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <span class="tool-label">Modo claro u oscuro</span>
        </button>
        <a class="btn btn--dark" href="/#contacto">Solicitar cotización</a>
      </div>
    </div>
  </header>
  <main id="contenido">
    <section class="service-page-hero">
      <div class="container service-page-hero__grid">
        <div>
          <nav class="breadcrumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span>/</span><a href="/#servicios">Servicios</a><span>/</span><span>${esc(service.short)}</span></nav>
          <p class="eyebrow">Servicio en Salto, Uruguay</p>
          <h1>${esc(service.name)}</h1>
          <p class="service-page-lead">${esc(service.description)}</p>
          <div class="service-page-actions"><a class="btn btn--dark" href="/#contacto">Pedir presupuesto</a><a class="btn service-page-whatsapp" href="https://wa.me/59898152423?text=${encodeURIComponent(`Hola ADONAI ELECTRICAL, quisiera consultar por ${service.short}.`)}">Consultar por WhatsApp</a></div>
        </div>
        <figure class="service-page-visual${hero.className ? ` ${hero.className}` : ''}"><img src="/${hero.src}" alt="${esc(hero.alt)}"${hero.width ? ` width="${hero.width}"` : ''}${hero.height ? ` height="${hero.height}"` : ''} loading="eager" decoding="async"></figure>
      </div>
    </section>
    <section class="section service-page-content">
      <div class="container service-page-content__grid">
        <article>
          <p class="eyebrow">Solución profesional</p>
          <h2>Un servicio pensado para cada instalación.</h2>
          <p>${esc(service.intro)}</p>
          <h3>¿Qué puede incluir?</h3>
          <ul class="service-page-scope">${service.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        </article>
        <aside class="service-page-local">
          <p class="eyebrow">Atención local</p>
          <h2>${esc(service.search)}</h2>
          <p>Trabajamos en Salto y coordinamos cada consulta según la ubicación, el alcance y las condiciones técnicas del lugar.</p>
          <dl><div><dt>Zona</dt><dd>Salto, Uruguay</dd></div><div><dt>Teléfono</dt><dd><a href="tel:+59898152423">+598 98 152 423</a></dd></div><div><dt>Habilitación</dt><dd>Técnico Instalador Categoría C ante UTE</dd></div></dl>
        </aside>
      </div>
    </section>
${[evidence, project].filter(Boolean).join('\n')}
    <section class="section section--soft service-page-process">
      <div class="container"><p class="eyebrow">Cómo trabajamos</p><h2>Consulta, relevamiento, presupuesto y ejecución.</h2><ol class="process-list"><li><span class="process-mark" aria-hidden="true"><img src="/proceso-consulta.webp" alt="" width="72" height="72" loading="lazy" decoding="async"></span><div><h3>Consulta</h3><p>Recibimos la información inicial.</p></div></li><li><span class="process-mark" aria-hidden="true"><img src="/proceso-relevamiento.webp" alt="" width="72" height="72" loading="lazy" decoding="async"></span><div><h3>Relevamiento</h3><p>Evaluamos el lugar y la instalación.</p></div></li><li><span class="process-mark" aria-hidden="true"><img src="/proceso-presupuesto.webp" alt="" width="72" height="72" loading="lazy" decoding="async"></span><div><h3>Presupuesto</h3><p>Definimos el alcance y la propuesta.</p></div></li><li><span class="process-mark" aria-hidden="true"><img src="/proceso-ejecucion.webp" alt="" width="72" height="72" loading="lazy" decoding="async"></span><div><h3>Ejecución</h3><p>Coordinamos y realizamos el trabajo.</p></div></li></ol></div>
    </section>
    <section class="section"><div class="container"><p class="eyebrow">Otros servicios</p><h2>También podemos ayudarte con</h2><div class="service-page-related">${related.map(item => `<a href="/servicios/${item.slug}/"><strong>${esc(item.short)}</strong><span>${esc(item.description)}</span></a>`).join('')}</div></div></section>
    <section class="service-page-cta"><div class="container"><div><p class="eyebrow">Hablemos</p><h2>Cuéntanos qué necesitas.</h2><p>Evaluaremos tu consulta para coordinar los próximos pasos.</p></div><a class="btn" href="/#contacto">Solicitar cotización</a></div></section>
  </main>
  <footer class="service-page-footer"><div class="container"><span>© ${new Date().getFullYear()} ADONAI ELECTRICAL · Salto, Uruguay</span><a href="/">Volver al sitio principal</a></div></footer>
</body>
</html>\n`;
}

for (const service of services) {
  if (service.customPage) continue;
  const dir = path.join(root, 'servicios', service.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(service), 'utf8');
}

const urls = [
  { loc: `${site}/`, priority: '1.0' },
  { loc: `${site}/en/`, priority: '0.8' },
  ...services.map(service => ({ loc: `${site}/servicios/${service.slug}/`, priority: '0.8' }))
];
const alternates = `\n    <xhtml:link rel="alternate" hreflang="es" href="${site}/"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${site}/en/"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/"/>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${updated}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${url.priority}</priority>${url.loc === `${site}/` || url.loc === `${site}/en/` ? alternates : ''}\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generadas ${services.filter(service => !service.customPage).length} páginas de servicio y sitemap.xml`);
