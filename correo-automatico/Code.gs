const CONFIG = Object.freeze({
  businessName: 'ADONAI ELECTRICAL',
  ownerName: 'Claudio Rodríguez',
  ownerEmail: 'adonaielectrical2026@gmail.com',
  phoneDisplay: '+598 98 152 423',
  whatsappUrl: 'https://wa.me/59898152423',
  siteUrl: 'https://adonaielectrical2026.github.io',
  logoUrl: 'https://adonaielectrical2026.github.io/logo-mark-92.webp',
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
    signatureRole: 'UTE-registered Electrical Installer · Category C',
    signatureRegistration: 'Registered electrical contractor with UTE',
    signatureTagline: 'Energy with purpose.',
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
    signatureRole: 'Técnico Instalador · Categoría C ante UTE',
    signatureRegistration: 'Firma Instaladora registrada ante UTE',
    signatureTagline: 'Energía con propósito.',
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
    '',
    CONFIG.ownerName,
    copy.signatureRole,
    CONFIG.businessName,
    CONFIG.phoneDisplay,
    CONFIG.ownerEmail,
    CONFIG.siteUrl,
    `${copy.signatureRegistration} · ${copy.signatureTagline}`,
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
          ${signatureBlock(copy)}
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

function signatureBlock(copy) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;margin-top:28px;border-collapse:separate;border-spacing:0;border:1px solid #2d2f33;border-radius:14px;overflow:hidden">
      <tr>
        <td colspan="2" style="background:#0d0e10;padding:19px 22px;color:#ffffff">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse">
            <tr>
              <td width="76" valign="middle" style="width:76px;padding-right:16px">
                <img src="${CONFIG.logoUrl}" width="64" height="64" alt="ADONAI ELECTRICAL" style="display:block;width:64px;height:64px;border:0;outline:none;text-decoration:none">
              </td>
              <td valign="middle" style="font-family:Arial,sans-serif;color:#ffffff">
                <div style="font-size:18px;line-height:1.25;font-weight:800">${escapeHtml(CONFIG.ownerName)}</div>
                <div style="font-size:13px;line-height:1.45;color:#d7d9dd;margin-top:3px">${escapeHtml(copy.signatureRole)}</div>
                <div style="font-size:12px;line-height:1.4;font-weight:800;letter-spacing:1.2px;color:#ffffff;margin-top:5px">${escapeHtml(CONFIG.businessName)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top" style="padding:16px 18px;background:#f7f7f8;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#333333">
          <a href="${CONFIG.whatsappUrl}" style="color:#1b1c1e;text-decoration:none;font-weight:700">${escapeHtml(CONFIG.phoneDisplay)}</a><br>
          <a href="mailto:${CONFIG.ownerEmail}" style="color:#1b1c1e;text-decoration:none">${escapeHtml(CONFIG.ownerEmail)}</a><br>
          <a href="${CONFIG.siteUrl}" style="color:#1b1c1e;text-decoration:none">adonaielectrical2026.github.io</a>
        </td>
        <td valign="top" align="right" style="padding:16px 18px;background:#f7f7f8;font-family:Arial,sans-serif;font-size:11px;line-height:1.55;color:#666666">
          <strong style="color:#252629">${escapeHtml(copy.signatureRegistration)}</strong><br>
          ${escapeHtml(copy.signatureTagline)}
        </td>
      </tr>
    </table>`;
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
