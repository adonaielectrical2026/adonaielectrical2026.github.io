#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const formEndpoint = 'https://script.google.com/macros/s/AKfycbxHTMyb5a34w6k1IhQCO7Mw3L-q3Y-p4DLwt__obO0sI9mZJQqqiXG_2aQi48yOdpserA/exec';
const pages = [
  'index.html',
  'en/index.html',
  ...fs.readdirSync(path.join(root, 'servicios')).map(slug => `servicios/${slug}/index.html`)
];
const errors = [];

for (const relativePath of pages) {
  const filePath = path.join(root, relativePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) errors.push(`${relativePath}: IDs duplicados: ${duplicateIds.join(', ')}`);

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    const cleanPath = url.split(/[?#]/)[0];
    if (!cleanPath) continue;
    let target = cleanPath.startsWith('/')
      ? path.join(root, cleanPath.slice(1))
      : path.resolve(path.dirname(filePath), cleanPath);
    if (cleanPath.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) errors.push(`${relativePath}: no existe ${url}`);
  }
}

for (const [relativePath, language] of [['index.html', 'es'], ['en/index.html', 'en']]) {
  const html = fs.readFileSync(path.join(root, relativePath), 'utf8');
  if (!html.includes(`action="${formEndpoint}"`)) {
    errors.push(`${relativePath}: el formulario no apunta a Google Apps Script.`);
  }
  if (!html.includes(`name="idioma" value="${language}"`)) {
    errors.push(`${relativePath}: el idioma del formulario no es ${language}.`);
  }
  if (/formsubmit\.co|_autoresponse|name="_next"/.test(html)) {
    errors.push(`${relativePath}: conserva configuración obsoleta de FormSubmit.`);
  }
  if (!html.includes('id="preguntas-frecuentes"')) {
    errors.push(`${relativePath}: falta la sección de preguntas frecuentes.`);
  }
  const faqMatch = html.match(/<script type="application\/ld\+json" id="faq-schema">([\s\S]*?)<\/script>/);
  if (!faqMatch) {
    errors.push(`${relativePath}: falta el marcado estructurado FAQPage.`);
  } else {
    try {
      const faqSchema = JSON.parse(faqMatch[1]);
      if (faqSchema['@type'] !== 'FAQPage' || faqSchema.mainEntity?.length !== 6) {
        errors.push(`${relativePath}: el marcado FAQPage no contiene las seis preguntas esperadas.`);
      }
    } catch (error) {
      errors.push(`${relativePath}: el marcado FAQPage no es JSON válido.`);
    }
  }
}

const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
if (!appSource.includes('setTimeout(hidePreloader, 4000)')) {
  errors.push('Carga inicial: falta el respaldo de cuatro segundos para el indicador no bloqueante.');
}
if (appSource.includes('setTimeout(hidePreloader, 1500)')) {
  errors.push('Carga inicial: conserva el tiempo simulado anterior.');
}

const mailSource = fs.readFileSync(path.join(root, 'correo-automatico', 'Code.gs'), 'utf8');
const sent = [];
const sandbox = {
  MailApp: { sendEmail: options => sent.push(options) },
  HtmlService: { createHtmlOutput: html => ({ html }) }
};
vm.createContext(sandbox);
vm.runInContext(mailSource, sandbox);

sandbox.doPost({ parameter: {
  name: 'María Pérez', email: 'maria@example.com', phone: '099 000 000',
  service: 'iluminacion', zone: 'Centro', message: 'Necesito una cotización.', idioma: 'es', _honey: ''
} });
if (sent.length !== 2) errors.push('Correo ES: no se generaron los dos mensajes esperados.');
if (sent[1]?.subject !== 'Recibimos tu solicitud | ADONAI ELECTRICAL') errors.push('Correo ES: asunto incorrecto.');
if (!sent[1]?.body.includes('Hola María Pérez')) errors.push('Correo ES: saludo incorrecto.');

sent.length = 0;
sandbox.doPost({ parameter: {
  name: 'John', email: 'john@example.com', phone: '',
  service: 'proyectos', zone: 'Salto', message: 'Quote request', idioma: 'en', _honey: ''
} });
if (sent.length !== 2) errors.push('Correo EN: no se generaron los dos mensajes esperados.');
if (sent[1]?.subject !== 'We received your request | ADONAI ELECTRICAL') errors.push('Correo EN: asunto incorrecto.');

sent.length = 0;
sandbox.doPost({ parameter: {
  name: 'Bot', email: 'bot@example.com', message: 'spam', idioma: 'es', _honey: 'filled'
} });
if (sent.length !== 0) errors.push('Protección antispam: el campo trampa no detuvo el envío.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verificación correcta: ${pages.length} páginas y correo automático ES/EN.`);
}
