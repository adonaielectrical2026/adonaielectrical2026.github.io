#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = __dirname;
const site = 'https://adonaielectrical2026.github.io';
const updated = '2026-10-01';

const services = [
  {
    slug: 'proyectos-electricos-en-salto',
    name: 'Proyectos eléctricos en Salto',
    short: 'Proyectos nuevos',
    description: 'Planificación, presupuesto e instalación eléctrica para viviendas, comercios, industrias, ampliaciones y obras nuevas en Salto.',
    image: 'canalizacion.webp',
    intro: 'Desarrollamos soluciones eléctricas para obras nuevas y ampliaciones, considerando el uso previsto de cada espacio, las cargas necesarias y las condiciones técnicas del proyecto.',
    items: ['Revisión de planos y necesidades', 'Definición del alcance eléctrico', 'Canalizaciones, tableros y puntos eléctricos', 'Iluminación general y coordinación de obra'],
    search: 'proyecto eléctrico en Salto'
  },
  {
    slug: 'remodelaciones-electricas-en-salto',
    name: 'Remodelaciones eléctricas en Salto',
    short: 'Remodelaciones',
    description: 'Modificación y adecuación de instalaciones eléctricas para reformas residenciales, comerciales e industriales en Salto.',
    image: 'iluminacion-geometrica.webp',
    intro: 'Adaptamos instalaciones existentes a nuevas distribuciones, usos y necesidades de iluminación, evaluando previamente el estado de los circuitos y protecciones.',
    items: ['Modificación de puntos eléctricos', 'Adecuación de circuitos y tableros', 'Renovación de iluminación', 'Coordinación con reformas y terminaciones'],
    search: 'remodelación eléctrica en Salto'
  },
  {
    slug: 'mantenimiento-electrico-en-salto',
    name: 'Mantenimiento eléctrico en Salto',
    short: 'Mantenimiento',
    description: 'Diagnóstico, mantenimiento preventivo y reparaciones eléctricas para viviendas, comercios e industrias en Salto.',
    image: 'protecciones.webp',
    intro: 'Revisamos fallas, desgaste y condiciones de funcionamiento para definir las reparaciones o tareas preventivas que requiere cada instalación.',
    items: ['Diagnóstico de fallas', 'Revisión de tableros y protecciones', 'Reparaciones y sustituciones', 'Mantenimiento preventivo y correctivo'],
    search: 'mantenimiento eléctrico en Salto'
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
    search: 'iluminación de emergencia en Salto'
  },
  {
    slug: 'tramites-ute-en-salto',
    name: 'Trámites ante UTE en Salto',
    short: 'Trámites ante UTE',
    description: 'Asesoramiento técnico y acompañamiento para solicitudes de suministro, rehabilitación y cambios de potencia ante UTE en Salto.',
    image: 'plano-nuevo.webp',
    intro: 'Acompañamos la preparación técnica de gestiones vinculadas a instalaciones eléctricas, definiendo primero qué intervención corresponde en cada caso.',
    items: ['Solicitud de suministro', 'Solicitud de rehabilitación', 'Modificación de potencia contratada', 'Evaluación de adecuaciones necesarias'],
    search: 'trámites UTE en Salto'
  },
  {
    slug: 'instalacion-camaras-seguridad-en-salto',
    name: 'Instalación de cámaras de seguridad en Salto',
    short: 'Cámaras de seguridad',
    description: 'Instalación de cámaras de seguridad y sistemas de videovigilancia para viviendas, comercios e industrias en Salto.',
    image: 'camara-terminada.webp',
    intro: 'Instalamos sistemas de videovigilancia con una ubicación planificada de cámaras, tendido protegido y configuración inicial según las necesidades del lugar.',
    items: ['Evaluación de zonas a supervisar', 'Instalación y orientación de cámaras', 'Cableado, alimentación y conexiones', 'Configuración inicial y verificación del sistema'],
    search: 'instalación de cámaras en Salto'
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
  return `<!DOCTYPE html>
<html lang="es-UY">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(service.name)} | ADONAI ELECTRICAL</title>
  <meta name="description" content="${esc(service.description)}">
  <meta name="theme-color" content="#111111">
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
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="service-page-body">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="service-page-header">
    <div class="container service-page-header__inner">
      <a class="service-page-brand" href="/" aria-label="ADONAI ELECTRICAL, volver al inicio"><img src="/logo-mark-92.webp" alt="" width="46" height="46"><span><strong>ADONAI</strong> ELECTRICAL</span></a>
      <a class="btn btn--dark" href="/#contacto">Solicitar cotización</a>
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
        <figure class="service-page-visual"><img src="/${service.image}" alt="${esc(service.short)} — ADONAI ELECTRICAL en Salto" loading="eager" decoding="async"></figure>
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
    <section class="section section--soft service-page-process">
      <div class="container"><p class="eyebrow">Cómo trabajamos</p><h2>Consulta, relevamiento, presupuesto y ejecución.</h2><ol class="process-list"><li><span>01</span><div><h3>Consulta</h3><p>Recibimos la información inicial.</p></div></li><li><span>02</span><div><h3>Relevamiento</h3><p>Evaluamos el lugar y la instalación.</p></div></li><li><span>03</span><div><h3>Presupuesto</h3><p>Definimos el alcance y la propuesta.</p></div></li><li><span>04</span><div><h3>Ejecución</h3><p>Coordinamos y realizamos el trabajo.</p></div></li></ol></div>
    </section>
    <section class="section"><div class="container"><p class="eyebrow">Otros servicios</p><h2>También podemos ayudarte con</h2><div class="service-page-related">${related.map(item => `<a href="/servicios/${item.slug}/"><strong>${esc(item.short)}</strong><span>${esc(item.description)}</span></a>`).join('')}</div></div></section>
    <section class="service-page-cta"><div class="container"><div><p class="eyebrow">Hablemos</p><h2>Cuéntanos qué necesitas.</h2><p>Evaluaremos tu consulta para coordinar los próximos pasos.</p></div><a class="btn" href="/#contacto">Solicitar cotización</a></div></section>
  </main>
  <footer class="service-page-footer"><div class="container"><span>© ${new Date().getFullYear()} ADONAI ELECTRICAL · Salto, Uruguay</span><a href="/">Volver al sitio principal</a></div></footer>
</body>
</html>`;
}

for (const service of services) {
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
console.log(`Generadas ${services.length} páginas de servicio y sitemap.xml`);
