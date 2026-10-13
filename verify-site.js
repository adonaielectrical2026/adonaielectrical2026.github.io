#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
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
