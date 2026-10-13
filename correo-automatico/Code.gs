const CONFIG = Object.freeze({
  businessName: 'ADONAI ELECTRICAL',
  ownerEmail: 'adonaielectrical2026@gmail.com',
  phoneDisplay: '+598 98 152 423',
  whatsappUrl: 'https://wa.me/59898152423',
  siteUrl: 'https://adonaielectrical2026.github.io',
  address: 'Av. Defensa 1599, Salto, Uruguay'
});

const SERVICES = Object.freeze({
  proyectos: { es: 'Proyectos nuevos', en: 'New projects' },
  remodelaciones: { es: 'Remodelaciones', en: 'Renovations' },
  mantenimiento: { es: 'Mantenimiento', en: 'Maintenance' },
  emergencias: { es: 'Emergencias eléctricas', en: 'Electrical emergencies' },
  iluminacion: { es: 'Iluminación de emergencia', en: 'Emergency lighting' },
  tramites: { es: 'Trámites ante UTE', en: 'UTE paperwork' },
  camaras: { es: 'Instalación de cámaras de seguridad', en: 'Security camera installation' },
  otro: { es: 'Otra consulta', en: 'Other inquiry' }
});

function doGet() {
  return HtmlService.createHtmlOutput('ADONAI ELECTRICAL · Formulario activo');
}

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};
  const language = data.idioma === 'en' ? 'en' : 'es';
  const successUrl = language === 'en'
    ? `${CONFIG.siteUrl}/en/thanks/`
    : `${CONFIG.siteUrl}/gracias/`;

  if (String(data._honey || '').trim()) {
    return redirectPage(successUrl, language);
  }

  const request = {
    name: clean(data.name, 100),
    email: clean(data.email, 180),
    phone: clean(data.phone, 60),
    serviceKey: clean(data.service, 40),
    zone: clean(data.zone, 120),
    message: clean(data.message, 4000),
    language
  };

  if (!request.name || !isValidEmail(request.email) || !request.message) {
    return errorPage(language);
  }

  const service = serviceLabel(request.serviceKey, language);
  sendOwnerNotification(request, service);
  sendCustomerConfirmation(request, service);

  return redirectPage(successUrl, language);
}

function sendOwnerNotification(request, service) {
  const subject = `Nueva consulta web: ${service} — ${request.name}`;
  const plainText = [
    'Nueva consulta desde la web de ADONAI ELECTRICAL',
    '',
    `Nombre: ${request.name}`,
    `Email: ${request.email}`,
    `Teléfono: ${request.phone}`,
    `Servicio: ${service}`,
    `Zona: ${request.zone}`,
    '',
    'Mensaje:',
    request.message
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#161616;line-height:1.55;max-width:680px;margin:auto">
      <div style="background:#0d0e10;color:#fff;padding:22px 26px;border-radius:16px 16px 0 0">
        <div style="font-size:12px;letter-spacing:1.8px;color:#b8bac0;font-weight:700">NUEVA CONSULTA WEB</div>
        <h1 style="font-size:23px;margin:7px 0 0">${escapeHtml(CONFIG.businessName)}</h1>
      </div>
      <div style="border:1px solid #dedfe2;border-top:0;padding:26px;border-radius:0 0 16px 16px">
        ${detailRow('Nombre', request.name)}
        ${detailRow('Email', request.email)}
        ${detailRow('Teléfono', request.phone || 'No indicado')}
        ${detailRow('Servicio', service)}
        ${detailRow('Zona', request.zone || 'No indicada')}
        <h2 style="font-size:15px;margin:24px 0 8px">Mensaje</h2>
        <div style="background:#f4f4f5;border-radius:12px;padding:16px;white-space:pre-wrap">${escapeHtml(request.message)}</div>
      </div>
    </div>`;

  MailApp.sendEmail({
    to: CONFIG.ownerEmail,
    replyTo: request.email,
    name: CONFIG.businessName,
    subject,
    body: plainText,
    htmlBody: html
  });
}

function sendCustomerConfirmation(request, service) {
  const isEnglish = request.language === 'en';
  const copy = isEnglish ? {
    subject: 'We received your request | ADONAI ELECTRICAL',
    eyebrow: 'REQUEST RECEIVED',
    greeting: `Hello ${request.name},`,
    intro: 'Thank you for contacting ADONAI ELECTRICAL. We received your request correctly.',
    next: 'We will review the information and contact you to coordinate the next steps.',
    summary: 'Request summary',
    service: 'Service',
    zone: 'Area',
    message: 'Message',
    whatsapp: 'Contact us on WhatsApp',
    urgent: 'If your request is urgent, call us or contact us on WhatsApp.',
    footer: 'This is an automatic confirmation. You can reply to this email if you need to add information.'
  } : {
    subject: 'Recibimos tu solicitud | ADONAI ELECTRICAL',
    eyebrow: 'SOLICITUD RECIBIDA',
    greeting: `Hola ${request.name},`,
    intro: 'Gracias por comunicarte con ADONAI ELECTRICAL. Recibimos correctamente tu solicitud.',
    next: 'Revisaremos la información y nos pondremos en contacto contigo para coordinar los próximos pasos.',
    summary: 'Resumen de la solicitud',
    service: 'Servicio',
    zone: 'Zona',
    message: 'Mensaje',
    whatsapp: 'Escribir por WhatsApp',
    urgent: 'Si tu consulta es urgente, llámanos o escríbenos por WhatsApp.',
    footer: 'Esta es una confirmación automática. Puedes responder este correo si necesitas agregar información.'
  };

  const plainText = [
    copy.greeting,
    '',
    copy.intro,
    copy.next,
    '',
    `${copy.service}: ${service}`,
    `${copy.zone}: ${request.zone || '—'}`,
    `${copy.message}: ${request.message}`,
    '',
    copy.urgent,
    `${CONFIG.phoneDisplay} · ${CONFIG.address}`,
    '',
    copy.footer
  ].join('\n');

  const html = `
    <div style="margin:0;padding:24px;background:#f2f2f3;font-family:Arial,sans-serif;color:#18191b;line-height:1.55">
      <div style="max-width:640px;margin:auto;background:#fff;border:1px solid #dedfe2;border-radius:18px;overflow:hidden">
        <div style="background:#0d0e10;color:#fff;padding:28px 30px">
          <div style="font-size:11px;letter-spacing:2px;color:#b8bac0;font-weight:700">${copy.eyebrow}</div>
          <div style="font-size:25px;font-weight:800;margin-top:8px">${CONFIG.businessName}</div>
        </div>
        <div style="padding:30px">
          <h1 style="font-size:22px;margin:0 0 14px">${escapeHtml(copy.greeting)}</h1>
          <p style="margin:0 0 10px">${copy.intro}</p>
          <p style="margin:0 0 24px">${copy.next}</p>
          <div style="background:#f4f4f5;border-radius:14px;padding:18px 20px">
            <div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:13px">${copy.summary}</div>
            ${detailRow(copy.service, service)}
            ${detailRow(copy.zone, request.zone || '—')}
            <div style="margin-top:14px"><strong>${copy.message}</strong><div style="margin-top:6px;white-space:pre-wrap">${escapeHtml(request.message)}</div></div>
          </div>
          <p style="margin:24px 0 16px">${copy.urgent}</p>
          <a href="${CONFIG.whatsappUrl}" style="display:inline-block;background:#238451;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px">${copy.whatsapp}</a>
          <p style="font-size:14px;margin:22px 0 0"><strong>${CONFIG.phoneDisplay}</strong><br>${CONFIG.address}</p>
        </div>
        <div style="padding:18px 30px;background:#f7f7f8;color:#666;font-size:12px">${copy.footer}</div>
      </div>
    </div>`;

  MailApp.sendEmail({
    to: request.email,
    replyTo: CONFIG.ownerEmail,
    name: CONFIG.businessName,
    subject: copy.subject,
    body: plainText,
    htmlBody: html
  });
}

function serviceLabel(key, language) {
  const service = SERVICES[key] || SERVICES.otro;
  return service[language] || service.es;
}

function detailRow(label, value) {
  return `<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid #e6e6e8"><strong style="min-width:90px">${escapeHtml(label)}</strong><span>${escapeHtml(value || '—')}</span></div>`;
}

function clean(value, maxLength) {
  return String(value || '').replace(/\u0000/g, '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function redirectPage(url, language) {
  const text = language === 'en' ? 'Request sent. Returning to the website…' : 'Solicitud enviada. Volviendo al sitio…';
  const safeUrl = escapeHtml(url);
  return HtmlService.createHtmlOutput(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${safeUrl}"><title>${text}</title></head><body style="font-family:Arial,sans-serif;padding:40px;text-align:center"><p>${text}</p><p><a href="${safeUrl}">Continuar</a></p></body></html>`);
}

function errorPage(language) {
  const isEnglish = language === 'en';
  const title = isEnglish ? 'We could not send the request' : 'No pudimos enviar la solicitud';
  const text = isEnglish
    ? 'Please check the required fields and try again, or contact us on WhatsApp.'
    : 'Revisa los campos obligatorios e inténtalo nuevamente, o comunícate por WhatsApp.';
  return HtmlService.createHtmlOutput(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head><body style="font-family:Arial,sans-serif;padding:40px;text-align:center"><h1>${title}</h1><p>${text}</p><p><a href="${CONFIG.siteUrl}/#contacto">Volver al formulario</a> · <a href="${CONFIG.whatsappUrl}">WhatsApp</a></p></body></html>`);
}
