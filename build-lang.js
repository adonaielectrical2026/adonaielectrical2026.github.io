#!/usr/bin/env node
/*
 * Genera una versión estática de index.html en otro idioma (por ejemplo en/index.html),
 * con el texto ya traducido "de fábrica" en el HTML en vez de aplicado por JavaScript.
 * Esto permite que Google indexe cada idioma en su propia URL.
 *
 * Uso:  node build-lang.js en
 *
 * Fuente de verdad: index.html (español) + el diccionario de traducciones de app.js.
 * Cuando cambia el contenido en español, hay que volver a correr este script antes
 * de publicar para que la página generada quede al día.
 */
const fs = require('fs');
const path = require('path');

const LANG = process.argv[2];
if (!LANG) {
  console.error('Uso: node build-lang.js <es|en|pt>');
  process.exit(1);
}

const ROOT = __dirname;
const SITE_URL = 'https://adonaielectrical2026.github.io';

/* ---------- 1. Cargar el diccionario de traducciones desde app.js ---------- */
function loadTranslations() {
  const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const lines = appJs.split('\n');
  const start = lines.findIndex(l => l.includes('const translations = {'));
  const end = lines.findIndex(l => l.includes('const pageMetadata = {'));
  if (start === -1 || end === -1) throw new Error('No se encontró el diccionario de traducciones en app.js');
  const snippet = lines.slice(start, end).join('\n') + '\nmodule.exports = translations;';
  const tmpPath = path.join(ROOT, '.build-lang-tmp.js');
  fs.writeFileSync(tmpPath, snippet, 'utf8');
  delete require.cache[require.resolve(tmpPath)];
  const translations = require(tmpPath);
  fs.unlinkSync(tmpPath);
  return translations;
}

function loadPageMetadata() {
  const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const lines = appJs.split('\n');
  const start = lines.findIndex(l => l.includes('const pageMetadata = {'));
  const end = lines.findIndex((l, i) => i > start && l.trim() === '};');
  const snippet = lines.slice(start, end + 1).join('\n') + '\nmodule.exports = pageMetadata;';
  const tmpPath = path.join(ROOT, '.build-lang-tmp2.js');
  fs.writeFileSync(tmpPath, snippet, 'utf8');
  delete require.cache[require.resolve(tmpPath)];
  const pageMetadata = require(tmpPath);
  fs.unlinkSync(tmpPath);
  return pageMetadata;
}

const translations = loadTranslations();
const pageMetadata = loadPageMetadata();
const dict = translations[LANG] || {};

function tr(text) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const translated = dict[trimmed];
  if (translated === undefined) return text;
  const start = text.indexOf(trimmed);
  return text.slice(0, start) + translated + text.slice(start + trimmed.length);
}

/* ---------- 2. Traducir el texto visible del HTML, preservando script/style/svg/template ---------- */
function translateHtmlBody(html) {
  const protectedTags = ['script', 'style', 'svg', 'template'];
  let result = '';
  let i = 0;
  const n = html.length;

  function matchTagName(str, pos) {
    const m = /^<\/?([a-zA-Z0-9]+)/.exec(str.slice(pos));
    return m ? m[1].toLowerCase() : null;
  }

  while (i < n) {
    if (html[i] === '<') {
      // Comentario: copiar tal cual
      if (html.startsWith('<!--', i)) {
        const closeIdx = html.indexOf('-->', i);
        const end = closeIdx === -1 ? n : closeIdx + 3;
        result += html.slice(i, end);
        i = end;
        continue;
      }
      const isClosingTag = html[i + 1] === '/';
      const tagName = matchTagName(html, i);
      const tagEnd = html.indexOf('>', i);
      if (tagEnd === -1) { result += html.slice(i); break; }
      const tagText = html.slice(i, tagEnd + 1);
      const isSelfClosing = tagText.endsWith('/>');
      result += tagText;
      i = tagEnd + 1;

      if (tagName && !isClosingTag && !isSelfClosing && protectedTags.includes(tagName)) {
        // Copiar el contenido protegido tal cual hasta su tag de cierre, sin traducir.
        const closeTag = `</${tagName}`;
        const closeIdx = html.toLowerCase().indexOf(closeTag, i);
        if (closeIdx !== -1) {
          const closeTagEnd = html.indexOf('>', closeIdx);
          result += html.slice(i, closeTagEnd + 1);
          i = closeTagEnd + 1;
        }
      }
      continue;
    }
    // Texto plano hasta el próximo '<'
    const nextTag = html.indexOf('<', i);
    const end = nextTag === -1 ? n : nextTag;
    const textChunk = html.slice(i, end);
    result += textChunk.trim() ? tr(textChunk) : textChunk;
    i = end;
  }
  return result;
}

function translateAttributes(html) {
  return html.replace(/\b(aria-label|title|placeholder)="([^"]*)"/g, (match, attr, value) => {
    if (!value.trim()) return match;
    return `${attr}="${tr(value)}"`;
  });
}

/* ---------- 3. Generar la página ---------- */
function build() {
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  html = translateHtmlBody(html);
  html = translateAttributes(html);

  const langAttr = LANG === 'pt' ? 'pt-BR' : LANG === 'es' ? 'es-UY' : LANG;
  html = html.replace('<html lang="es-UY">', `<html lang="${langAttr}" data-static-lang="${LANG}">`);

  const meta = pageMetadata[LANG] || pageMetadata.es;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${meta.description}">`
  );

  const pageUrl = `${SITE_URL}/${LANG === 'es' ? '' : LANG + '/'}`;
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${pageUrl}">`);

  const ogCopy = {
    en: {
      title: 'ADONAI ELECTRICAL | Electrician in Salto',
      description: 'Residential and industrial electrical installations in Salto, Uruguay. New projects, renovations, maintenance, emergencies and UTE paperwork.',
      twitterDescription: 'Residential and industrial electrical installations in Salto, Uruguay.'
    }
  };
  if (ogCopy[LANG]) {
    const c = ogCopy[LANG];
    html = html.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="en_US">`);
    html = html.replace(
      /<meta property="og:locale:alternate" content="en_US">\s*\n\s*<meta property="og:locale:alternate" content="pt_BR">/,
      '<meta property="og:locale:alternate" content="es_UY">\n  <meta property="og:locale:alternate" content="pt_BR">'
    );
    html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${pageUrl}">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${c.title}">`);
    html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${c.description}">`);
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${c.title}">`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${c.twitterDescription}">`);
  }

  // JSON-LD: traducir campos de texto clave manualmente (alcance acotado, no todo el documento).
  if (LANG === 'en') {
    html = html.replace('"slogan": "Energía con propósito",', '"slogan": "Energy with purpose",');
    html = html.replace(
      '"description": "Instalaciones eléctricas residenciales e industriales en Salto, Uruguay: proyectos nuevos, remodelaciones, mantenimiento, emergencias, iluminación de emergencia y trámites ante UTE.",',
      '"description": "Residential and industrial electrical installations in Salto, Uruguay: new projects, renovations, maintenance, emergencies, emergency lighting and UTE paperwork.",'
    );
    html = html.replace('"name": "Emergencias eléctricas",', '"name": "Electrical emergencies",');
    html = html.replace(
      '"description": "Atención de emergencias eléctricas las 24 horas, todos los días.",',
      '"description": "Electrical emergency response 24 hours a day, every day.",'
    );
  }

  // hreflang: apuntar cada variante a su propia URL, sin duplicar la propia.
  html = html.replace(
    /<link rel="alternate" hreflang="es" href="[^"]*">\s*\n\s*<link rel="alternate" hreflang="en" href="[^"]*">\s*\n\s*<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    [
      `<link rel="alternate" hreflang="es" href="${SITE_URL}/">`,
      `  <link rel="alternate" hreflang="en" href="${SITE_URL}/en/">`,
      `  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`
    ].join('\n')
  );

  // Rutas de archivos propias -> absolutas desde la raíz, para que sigan sirviendo desde /en/.
  html = html.replace(/(href|src)="(?!https?:\/\/|\/|#|mailto:|tel:)([^"]+)"/g, '$1="/$2"');

  // Selector de idioma: sin portugués en esta variante estática; "Volver" navega a la home.
  html = html.replace(
    /<select class="language-select" id="language-select" aria-label="[^"]*">[\s\S]*?<\/select>/,
    `<select class="language-select" id="language-select" aria-label="${tr('Seleccionar idioma')}">\n            <option value="es">ES</option>\n            <option value="en" selected>EN</option>\n          </select>`
  );

  const outDir = LANG === 'es' ? ROOT : path.join(ROOT, LANG);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Generado:', path.relative(ROOT, outPath), `(${(html.length / 1024).toFixed(0)} KB)`);
}

build();
