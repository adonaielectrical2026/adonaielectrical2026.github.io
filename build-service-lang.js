#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = __dirname;
const site = 'https://adonaielectrical2026.github.io';
const updated = new Date().toISOString().slice(0, 10);

const routes = [
  { es: 'proyectos-electricos-en-salto', en: 'electrical-projects-in-salto' },
  { es: 'remodelaciones-electricas-en-salto', en: 'electrical-renovations-in-salto' },
  { es: 'mantenimiento-electrico-en-salto', en: 'electrical-maintenance-in-salto' },
  { es: 'electricista-de-emergencia-en-salto', en: 'emergency-electrician-in-salto' },
  { es: 'iluminacion-de-emergencia-en-salto', en: 'emergency-lighting-in-salto' },
  { es: 'tramites-ute-en-salto', en: 'ute-procedures-in-salto' },
  { es: 'instalacion-camaras-seguridad-en-salto', en: 'security-camera-installation-in-salto' }
];

function loadTranslations() {
  const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const lines = appJs.split('\n');
  const start = lines.findIndex(line => line.includes('const translations = {'));
  const end = lines.findIndex(line => line.includes('const pageMetadata = {'));
  if (start === -1 || end === -1) throw new Error('No se encontró el diccionario de traducciones en app.js');
  const temp = path.join(root, '.build-service-lang-tmp.js');
  fs.writeFileSync(temp, lines.slice(start, end).join('\n') + '\nmodule.exports = translations;', 'utf8');
  delete require.cache[require.resolve(temp)];
  const translations = require(temp);
  fs.unlinkSync(temp);
  return translations.en || {};
}

const translations = Object.assign(loadTranslations(), {
  'Saltar al contenido': 'Skip to content',
  'ADONAI ELECTRICAL, volver al inicio': 'ADONAI ELECTRICAL, return to home',
  'Activar modo oscuro': 'Enable dark mode',
  'Cambiar modo de color': 'Change color mode',
  'Modo claro u oscuro': 'Light or dark mode',
  'Solicitar cotización': 'Request a quote',
  'Inicio': 'Home',
  'Servicios': 'Services',
  'Migas de pan': 'Breadcrumbs',
  'Servicio en Salto, Uruguay': 'Service in Salto, Uruguay',
  'Pedir presupuesto': 'Request a quote',
  'Consultar por WhatsApp': 'Contact us on WhatsApp',
  'Solución profesional': 'Professional solution',
  'Un servicio pensado para cada instalación.': 'A service tailored to each installation.',
  '¿Qué puede incluir?': 'What can it include?',
  'Atención local': 'Local service',
  'Trabajamos en Salto y coordinamos cada consulta según la ubicación, el alcance y las condiciones técnicas del lugar.': 'We work in Salto and coordinate each inquiry according to the location, scope and technical conditions of the site.',
  'Zona': 'Service area',
  'Teléfono': 'Phone',
  'Habilitación': 'Professional registration',
  'Técnico Instalador Categoría C ante UTE': 'UTE-registered Category C Installer Technician',
  'Trabajos realizados': 'Completed work',
  'Trabajo documentado': 'Documented work',
  'Cómo trabajamos': 'How we work',
  'Consulta, relevamiento, presupuesto y ejecución.': 'Inquiry, site assessment, quote and execution.',
  'Consulta': 'Inquiry',
  'Recibimos la información inicial.': 'We gather the initial information.',
  'Relevamiento': 'Site assessment',
  'Evaluamos el lugar y la instalación.': 'We assess the site and the installation.',
  'Presupuesto': 'Quote',
  'Definimos el alcance y la propuesta.': 'We define the scope and the proposal.',
  'Ejecución': 'Execution',
  'Coordinamos y realizamos el trabajo.': 'We coordinate and carry out the work.',
  'Otros servicios': 'Other services',
  'También podemos ayudarte con': 'We can also help you with',
  'Hablemos': 'Let’s talk',
  'Cuéntanos qué necesitas.': 'Tell us what you need.',
  'Evaluaremos tu consulta para coordinar los próximos pasos.': 'We will review your inquiry and coordinate the next steps.',
  'Volver al sitio principal': 'Return to the main site',
  'Proyectos eléctricos en Salto': 'Electrical projects in Salto',
  'Proyectos eléctricos en Salto | ADONAI ELECTRICAL': 'Electrical projects in Salto | ADONAI ELECTRICAL',
  'Proyectos nuevos': 'New projects',
  'Planificación, presupuesto e instalación eléctrica para viviendas, comercios, industrias, ampliaciones y obras nuevas en Salto.': 'Planning, quoting and electrical installation for homes, businesses, industrial sites, extensions and new construction in Salto.',
  'Desarrollamos soluciones eléctricas para obras nuevas y ampliaciones, considerando el uso previsto de cada espacio, las cargas necesarias y las condiciones técnicas del proyecto.': 'We develop electrical solutions for new construction and extensions, considering the intended use of each space, the required loads and the project’s technical conditions.',
  'Revisión de planos y necesidades': 'Review of plans and requirements',
  'Definición del alcance eléctrico': 'Definition of the electrical scope',
  'Canalizaciones, tableros y puntos eléctricos': 'Conduits, distribution boards and electrical points',
  'Iluminación general y coordinación de obra': 'General lighting and project coordination',
  'proyecto eléctrico en Salto': 'electrical project in Salto',
  'Canalizaciones ejecutadas durante una obra nueva.': 'Conduits installed during a new-build project.',
  'Registros reales de la distribución de cañerías y puntos eléctricos antes de las terminaciones.': 'Real records of conduit and electrical-point distribution before finishing work.',
  'Recorrido de cañerías previo al cierre de la obra.': 'Conduit routing before the project was closed up.',
  'Canalizaciones eléctricas distribuidas sobre la estructura del techo de una obra': 'Electrical conduits distributed across the roof structure of a construction project',
  'Detalle de varias cañerías eléctricas instaladas bajo una cubierta metálica': 'Detail of several electrical conduits installed beneath a metal roof',
  'Vista general de una obra con las canalizaciones eléctricas instaladas': 'General view of a construction project with the electrical conduits installed',
  'Proyecto eléctrico inicial · Salto': 'Initial electrical project · Salto',
  'Instalación eléctrica del Salón de Fiestas y Eventos SHEKINA.': 'Electrical installation for the SHEKINA Events Venue.',
  'El proyecto inicial incluyó la distribución eléctrica del establecimiento, la iluminación general, los tableros de protección y los circuitos destinados a los distintos sectores.': 'The initial project included the venue’s electrical distribution, general lighting, protection boards and circuits for the different areas.',
  'El tablero general alimenta prácticamente todo el salón. Un tablero secundario independiente abastece la cocina y los baños, facilitando la sectorización y el control de esos consumos.': 'The main distribution board supplies almost the entire venue. A separate secondary board supplies the kitchen and bathrooms, making those loads easier to isolate and control.',
  'Proyecto ejecutado': 'Completed project',
  'Fachada iluminada del Salón de Fiestas y Eventos SHEKINA en Salto': 'Illuminated façade of the SHEKINA Events Venue in Salto',
  'Resumen del proyecto eléctrico del Salón SHEKINA': 'Summary of the SHEKINA electrical project',
  'Tableros de distribución': 'Distribution boards',
  'Tablero general': 'Main distribution board',
  'Tablero secundario': 'Secondary distribution board',
  'Tablero general de distribución del Salón de Fiestas y Eventos SHEKINA': 'Main distribution board at the SHEKINA Events Venue',
  'Tablero secundario que alimenta la cocina y los baños del Salón SHEKINA': 'Secondary distribution board supplying the kitchen and bathrooms at the SHEKINA venue',
  'Luminarias de emergencia': 'Emergency lights',
  'Iluminación general': 'General lighting',
  'Paneles LED instalados como parte del proyecto eléctrico inicial.': 'LED panels installed as part of the initial electrical project.',
  'Distribución principal que alimenta prácticamente todo el salón.': 'Main distribution supplying almost the entire venue.',
  'Alimentación independiente para la cocina y los baños.': 'Separate supply for the kitchen and bathrooms.',
  'Iluminación de emergencia del establecimiento': 'Emergency lighting for the venue',
  'El proyecto también incorporó cinco luminarias autónomas para respaldar las rutas de salida.': 'The project also included five self-contained emergency lights to support the exit routes.',
  'Ver instalación de emergencia': 'View the emergency-lighting installation',
  'Remodelaciones eléctricas en Salto': 'Electrical renovations in Salto',
  'Remodelaciones eléctricas en Salto | ADONAI ELECTRICAL': 'Electrical renovations in Salto | ADONAI ELECTRICAL',
  'Remodelaciones': 'Renovations',
  'Modificación y adecuación de instalaciones eléctricas para reformas residenciales, comerciales e industriales en Salto.': 'Alteration and upgrading of electrical installations for residential, commercial and industrial renovations in Salto.',
  'Adaptamos instalaciones existentes a nuevas distribuciones, usos y necesidades de iluminación, evaluando previamente el estado de los circuitos y protecciones.': 'We adapt existing installations to new layouts, uses and lighting requirements after assessing the condition of circuits and protection devices.',
  'Modificación de puntos eléctricos': 'Alteration of electrical points',
  'Adecuación de circuitos y tableros': 'Upgrading circuits and distribution boards',
  'Renovación de iluminación': 'Lighting upgrades',
  'Coordinación con reformas y terminaciones': 'Coordination with renovation and finishing work',
  'remodelación eléctrica en Salto': 'electrical renovation in Salto',
  'Remodelaciones — ADONAI ELECTRICAL en Salto': 'Electrical renovations — ADONAI ELECTRICAL in Salto',
  'Iluminación renovada en espacios interiores.': 'Upgraded lighting in interior spaces.',
  'Ejemplos reales de luminarias instaladas y puestas en funcionamiento durante trabajos de adecuación.': 'Real examples of lights installed and commissioned during upgrading work.',
  'Montaje y puesta en funcionamiento.': 'Installation and commissioning.',
  'Plafón LED encendido después de su instalación en un ambiente interior': 'LED ceiling light switched on after installation in an interior space',
  'Iluminación general instalada y en funcionamiento.': 'General lighting installed and operating.',
  'Luminaria colgante': 'Pendant light',
  'Luminaria colgante con pantalla tejida encendida': 'Illuminated pendant light with a woven shade',
  'Detalle decorativo': 'Decorative detail',
  'Terminación de iluminación interior.': 'Interior-lighting finish.',
  'Mantenimiento eléctrico en Salto': 'Electrical maintenance in Salto',
  'Mantenimiento eléctrico en Salto | ADONAI ELECTRICAL': 'Electrical maintenance in Salto | ADONAI ELECTRICAL',
  'Mantenimiento': 'Maintenance',
  'Diagnóstico, mantenimiento preventivo y reparaciones eléctricas para viviendas, comercios e industrias en Salto.': 'Diagnostics, preventive maintenance and electrical repairs for homes, businesses and industrial sites in Salto.',
  'Revisamos fallas, desgaste y condiciones de funcionamiento para definir las reparaciones o tareas preventivas que requiere cada instalación.': 'We inspect faults, wear and operating conditions to determine the repairs or preventive work each installation requires.',
  'Diagnóstico de fallas': 'Fault diagnostics',
  'Revisión de tableros y protecciones': 'Inspection of distribution boards and protection devices',
  'Reparaciones y sustituciones': 'Repairs and replacements',
  'Mantenimiento preventivo y correctivo': 'Preventive and corrective maintenance',
  'mantenimiento eléctrico en Salto': 'electrical maintenance in Salto',
  'Mantenimiento — ADONAI ELECTRICAL en Salto': 'Electrical maintenance — ADONAI ELECTRICAL in Salto',
  'Registros para diagnóstico y mantenimiento.': 'Records used for diagnostics and maintenance.',
  'Documentamos el estado encontrado antes de definir las reparaciones o sustituciones necesarias.': 'We document the condition found before defining the necessary repairs or replacements.',
  'Las fotografías muestran condiciones encontradas antes o durante la intervención; no representan la terminación final del trabajo.': 'The photographs show conditions found before or during the intervention; they do not represent the finished work.',
  'Falla en tomacorrientes': 'Faulty outlets',
  'Tomacorrientes desmontados y conductores expuestos durante el diagnóstico de una falla eléctrica': 'Disassembled outlets and exposed conductors during electrical fault diagnosis',
  'Estado encontrado ante parpadeo de iluminación y chispeo al conectar equipos.': 'Condition found after reports of flickering lights and sparking when equipment was connected.',
  'Revisión del estado de un gabinete existente.': 'Inspection of an existing cabinet.',
  'Protecciones y conductores dentro de un gabinete antes del acondicionamiento': 'Protection devices and conductors inside a cabinet before upgrading work',
  'Daño en luminaria exterior': 'Damaged outdoor light',
  'Luminaria exterior con una rotura visible en su carcasa': 'Outdoor light with visible damage to its housing',
  'Registro previo a la intervención.': 'Record before the intervention.',
  'Punto a acondicionar': 'Point requiring improvement',
  'Luminaria exterior desprendida de su base sobre el césped': 'Outdoor light detached from its base on the lawn',
  'Evaluación de una luminaria desprendida.': 'Assessment of a detached outdoor light.',
  'Electricista de emergencia en Salto': 'Emergency electrician in Salto',
  'Electricista de emergencia en Salto | ADONAI ELECTRICAL': 'Emergency electrician in Salto | ADONAI ELECTRICAL',
  'Emergencias eléctricas': 'Electrical emergencies',
  'Atención de emergencias eléctricas las 24 horas en Salto para evaluar fallas, interrupciones y situaciones de riesgo.': '24-hour electrical emergency response in Salto to assess faults, outages and hazardous situations.',
  'Atendemos imprevistos eléctricos para identificar el origen del problema, evaluar las alternativas disponibles y restablecer condiciones seguras cuando el caso lo permite.': 'We respond to unexpected electrical problems to identify their cause, assess the available options and restore safe conditions whenever possible.',
  'Fallas e interrupciones inesperadas': 'Unexpected faults and outages',
  'Problemas en tableros y protecciones': 'Problems with distribution boards and protection devices',
  'Evaluación de riesgos eléctricos': 'Electrical risk assessment',
  'Atención las 24 horas, todos los días': '24-hour service, every day',
  'electricista de emergencia en Salto': 'emergency electrician in Salto',
  'Emergencias eléctricas — ADONAI ELECTRICAL en Salto': 'Electrical emergencies — ADONAI ELECTRICAL in Salto',
  'Iluminación de emergencia en Salto': 'Emergency lighting in Salto',
  'Iluminación de emergencia en Salto | ADONAI ELECTRICAL': 'Emergency lighting in Salto | ADONAI ELECTRICAL',
  'Iluminación de emergencia': 'Emergency lighting',
  'Instalación y revisión de luminarias de emergencia en Salto para viviendas, comercios, industrias y procesos ante DNB.': 'Installation and inspection of emergency lights in Salto for homes, businesses, industrial sites and DNB-related processes.',
  'Instalamos luminarias de emergencia y realizamos adecuaciones eléctricas asociadas, de acuerdo con el alcance técnico definido para cada inmueble.': 'We install emergency lights and carry out related electrical upgrades according to the technical scope defined for each property.',
  'Coordinación con el alcance del proceso ante DNB': 'Coordination with the scope of the DNB process',
  'Trabajamos principalmente en Salto y coordinamos proyectos en otras localidades según la ubicación, el alcance y las condiciones técnicas del lugar.': 'We work mainly in Salto and coordinate projects in other locations according to the location, scope and technical conditions of the site.',
  'Salto y otras localidades': 'Salto and other locations',
  'Servicio en Salto y coordinación en otras localidades': 'Service in Salto and coordination in other locations',
  'Trabajo realizado · Artigas': 'Completed work · Artigas',
  'Instalación finalizada en una sucursal de Artigas.': 'Completed installation at a branch in Artigas.',
  'Se instalaron nueve luminarias autónomas de emergencia: cinco en planta baja, dos en el entrepiso y dos en planta alta. La solución se adaptó durante la ejecución a las características constructivas del edificio.': 'Nine self-contained emergency lights were installed: five on the ground floor, two on the mezzanine and two on the upper floor. The solution was adapted during execution to the building’s construction characteristics.',
  'La obra incluyó tres circuitos de alimentación, aproximadamente 60 a 65 metros de canalización aparente en caño de acero galvanizado y entre 270 y 285 metros de conductores. Un tablero auxiliar de ocho módulos reúne la protección diferencial de 25 A y 30 mA y dos interruptores termomagnéticos C10: uno alimenta los circuitos 1 y 2, con cinco luminarias, y el otro alimenta el circuito 3, con cuatro luminarias.': 'The project included three supply circuits, approximately 60 to 65 metres of surface-mounted galvanized steel conduit and between 270 and 285 metres of conductors. An eight-module auxiliary panel contains 25 A / 30 mA residual-current protection and two C10 circuit breakers: one supplies circuits 1 and 2 with five lights, and the other supplies circuit 3 with four lights.',
  'Obra finalizada': 'Completed project',
  'Resumen técnico de la obra': 'Technical summary of the project',
  'Luminarias instaladas': 'Lights installed',
  'Circuitos de alimentación': 'Supply circuits',
  'Canalización galvanizada': 'Galvanized conduit',
  '8 módulos': '8 modules',
  'Luminaria instalada sobre la salida.': 'Light installed above the exit.',
  'Luminaria de emergencia instalada sobre un entrepiso en Artigas': 'Emergency light installed above a mezzanine in Artigas',
  'Vista general de una luminaria de emergencia instalada sobre el entrepiso': 'General view of an emergency light installed above the mezzanine',
  'Luminaria de emergencia y canalización galvanizada instaladas bajo el entrepiso': 'Emergency light and galvanized conduit installed beneath the mezzanine',
  'Luminaria de emergencia instalada junto a señalización de evacuación y extintores': 'Emergency light installed beside evacuation signage and fire extinguishers',
  'Luminaria de emergencia instalada sobre un extintor': 'Emergency light installed above a fire extinguisher',
  'Protecciones Schneider instaladas en el tablero auxiliar del sistema de iluminación de emergencia': 'Schneider protection devices installed in the emergency-lighting system’s auxiliary panel',
  'Detalle del equipo y la canalización aparente.': 'Detail of the unit and surface-mounted conduit.',
  'Cobertura junto a la señalización de seguridad.': 'Coverage beside the safety signage.',
  'Iluminación instalada junto a un extintor.': 'Emergency lighting installed beside a fire extinguisher.',
  'Diferencial y dos interruptores C10.': 'Residual-current protection and two C10 circuit breakers.',
  'Otro trabajo realizado · Salón SHEKINA': 'Another completed project · SHEKINA Events Venue',
  'Iluminación de emergencia en el Salón de Fiestas y Eventos SHEKINA.': 'Emergency lighting at the SHEKINA Events Venue.',
  'Como parte del proyecto eléctrico inicial del establecimiento, se instalaron cinco luminarias autónomas de emergencia para reforzar la iluminación de respaldo y la cobertura de las salidas.': 'As part of the venue’s initial electrical project, five self-contained emergency lights were installed to reinforce backup lighting and exit coverage.',
  'Las imágenes muestran los equipos instalados, su canalización y su ubicación respecto de las rutas de salida.': 'The images show the installed units, their conduit and their position in relation to the exit routes.',
  'Vista del salón': 'Venue view',
  'Equipo ubicado junto a una ruta de salida.': 'Unit positioned beside an exit route.',
  'Luminaria de emergencia instalada junto a una señal de salida en el Salón SHEKINA': 'Emergency light installed beside an exit sign at the SHEKINA venue',
  'Detalle de instalación': 'Installation detail',
  'Luminaria autónoma y canalización aparente.': 'Self-contained light and surface-mounted conduit.',
  'Detalle de una luminaria autónoma y su canalización en el Salón SHEKINA': 'Detail of a self-contained emergency light and its conduit at the SHEKINA venue',
  'Acceso señalizado': 'Marked exit',
  'Cobertura de emergencia sobre la salida.': 'Emergency coverage above the exit.',
  'Luminaria de emergencia instalada sobre un acceso señalizado del Salón SHEKINA': 'Emergency light installed above a marked exit at the SHEKINA venue',
  '¿Necesitas una instalación similar?': 'Do you need a similar installation?',
  'Cuéntanos las características del local y coordinamos una evaluación técnica.': 'Tell us about the property and we will arrange a technical assessment.',
  'Trámites ante UTE en Salto': 'UTE procedures in Salto',
  'Trámites ante UTE en Salto | ADONAI ELECTRICAL': 'UTE procedures in Salto | ADONAI ELECTRICAL',
  'Trámites ante UTE': 'UTE procedures',
  'Asesoramiento técnico y acompañamiento para solicitudes de suministro, rehabilitación y cambios de potencia ante UTE en Salto.': 'Technical advice and support for new supply, reconnection and contracted-capacity change requests with UTE in Salto.',
  'Acompañamos la preparación técnica de gestiones vinculadas a instalaciones eléctricas, definiendo primero qué intervención corresponde en cada caso.': 'We support the technical preparation of procedures related to electrical installations, first determining the appropriate intervention for each case.',
  'Evaluación de adecuaciones necesarias': 'Assessment of required upgrades',
  'trámites UTE en Salto': 'UTE procedures in Salto',
  'Solicitud de suministro para el Salón SHEKINA.': 'New supply request for the SHEKINA Events Venue.',
  'Registros del punto de medida exterior y de las protecciones asociadas al suministro solicitado para el salón de fiestas y eventos.': 'Records of the outdoor metering point and the protection devices associated with the requested supply for the events venue.',
  'Contexto de la instalación': 'Installation context',
  'Punto de medida exterior con el Salón SHEKINA al fondo.': 'Outdoor metering point with the SHEKINA venue in the background.',
  'Gabinete de medida': 'Metering cabinet',
  'Gabinete de medida exterior instalado para el Salón de Fiestas y Eventos SHEKINA': 'Outdoor metering cabinet installed for the SHEKINA Events Venue',
  'Gabinete de medida exterior y canalización instalados sobre una columna': 'Outdoor metering cabinet and conduit installed on a utility pole',
  'Vista del conjunto exterior instalado.': 'View of the installed outdoor assembly.',
  'Interruptor y protecciones eléctricas instaladas dentro de un gabinete': 'Circuit breaker and electrical protection devices installed inside a cabinet',
  'Instalación de cámaras de seguridad en Salto': 'Security camera installation in Salto',
  'Instalación de cámaras de seguridad en Salto | ADONAI ELECTRICAL': 'Security camera installation in Salto | ADONAI ELECTRICAL',
  'Cámaras de seguridad': 'Security cameras',
  'Instalación de cámaras de seguridad y sistemas de videovigilancia para viviendas, comercios e industrias en Salto.': 'Installation of security cameras and video surveillance systems for homes, businesses and industrial sites in Salto.',
  'Instalamos sistemas de videovigilancia con una ubicación planificada de cámaras, tendido protegido y configuración inicial según las necesidades del lugar.': 'We install video surveillance systems with planned camera placement, protected cabling and initial configuration based on the site’s needs.',
  'Evaluación de zonas a supervisar': 'Assessment of areas to monitor',
  'Instalación y orientación de cámaras': 'Camera installation and positioning',
  'Cableado, alimentación y conexiones': 'Cabling, power supply and connections',
  'Configuración inicial y verificación del sistema': 'Initial setup and system verification',
  'instalación de cámaras en Salto': 'security camera installation in Salto',
  'Instalación exterior documentada paso a paso.': 'Outdoor installation documented step by step.',
  'Canalización, conexiones protegidas y cámara instalada en su ubicación final.': 'Cable routing, protected connections and the camera installed in its final position.',
  'Canalización': 'Cable routing',
  'Tendido hasta el punto de instalación.': 'Cabling routed to the installation point.',
  'Cableado de alimentación y datos tendido hacia el punto de la cámara': 'Power and data cabling routed to the camera location',
  'Conexiones': 'Connections',
  'Terminación dentro de la caja de paso.': 'Connections completed inside the junction box.',
  'Conexiones protegidas dentro de una caja de paso': 'Protected connections inside a junction box',
  'Cámara conectada y orientada.': 'Camera connected and positioned.',
  'Cámara de seguridad exterior instalada bajo el alero de una vivienda en Salto': 'Outdoor security camera installed under the eave of a home in Salto'
});

function tr(text) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const translated = translations[trimmed];
  if (translated === undefined) return text;
  const start = text.indexOf(trimmed);
  return text.slice(0, start) + translated + text.slice(start + trimmed.length);
}

function translateHtmlBody(html) {
  const protectedTags = ['script', 'style', 'svg'];
  let result = '';
  let index = 0;
  while (index < html.length) {
    if (html[index] === '<') {
      if (html.startsWith('<!--', index)) {
        const commentEnd = html.indexOf('-->', index);
        const end = commentEnd === -1 ? html.length : commentEnd + 3;
        result += html.slice(index, end);
        index = end;
        continue;
      }
      const match = /^<\/?([a-zA-Z0-9]+)/.exec(html.slice(index));
      const tagName = match ? match[1].toLowerCase() : null;
      const isClosing = html[index + 1] === '/';
      const tagEnd = html.indexOf('>', index);
      if (tagEnd === -1) return result + html.slice(index);
      const tag = html.slice(index, tagEnd + 1);
      result += tag;
      index = tagEnd + 1;
      if (tagName && !isClosing && !tag.endsWith('/>') && protectedTags.includes(tagName)) {
        const closing = `</${tagName}`;
        const closeIndex = html.toLowerCase().indexOf(closing, index);
        if (closeIndex !== -1) {
          const closeEnd = html.indexOf('>', closeIndex);
          result += html.slice(index, closeEnd + 1);
          index = closeEnd + 1;
        }
      }
      continue;
    }
    const nextTag = html.indexOf('<', index);
    const end = nextTag === -1 ? html.length : nextTag;
    const chunk = html.slice(index, end);
    result += chunk.trim() ? tr(chunk) : chunk;
    index = end;
  }
  return result;
}

function translateAttributes(html) {
  return html.replace(/\b(alt|aria-label|title|placeholder|content)="([^"]*)"/g, (match, attribute, value) => {
    if (/^Abrir .+ en tamaño completo$/.test(value)) return `${attribute}="Open full-size image"`;
    return `${attribute}="${tr(value)}"`;
  });
}

function mapServiceUrl(value) {
  let mapped = value;
  routes.forEach(route => {
    mapped = mapped.replaceAll(`/servicios/${route.es}/`, `/en/services/${route.en}/`);
  });
  if (mapped === `${site}/`) return `${site}/en/`;
  if (mapped === `${site}/#servicios`) return `${site}/en/#servicios`;
  if (mapped.startsWith(`${site}/#`)) return mapped.replace(`${site}/#`, `${site}/en/#`);
  return mapped;
}

function translateJsonLd(html) {
  return html.replace(/<script type="application\/ld\+json"([^>]*)>([\s\S]*?)<\/script>/g, (match, attributes, source) => {
    try {
      const data = JSON.parse(source);
      const walk = value => {
        if (Array.isArray(value)) return value.map(walk);
        if (value && typeof value === 'object') {
          return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, walk(item)]));
        }
        if (typeof value !== 'string') return value;
        return mapServiceUrl(tr(value));
      };
      return `<script type="application/ld+json"${attributes}>${JSON.stringify(walk(data))}</script>`;
    } catch (error) {
      throw new Error(`No se pudo traducir JSON-LD: ${error.message}`);
    }
  });
}

function alternateLinks(spanishUrl, englishUrl) {
  return `<link rel="alternate" hreflang="es" href="${spanishUrl}">\n  <link rel="alternate" hreflang="en" href="${englishUrl}">\n  <link rel="alternate" hreflang="x-default" href="${spanishUrl}">`;
}

function enrichSpanishPage(html, route) {
  const spanishUrl = `${site}/servicios/${route.es}/`;
  const englishUrl = `${site}/en/services/${route.en}/`;
  html = html.replace(/\s*<link rel="alternate" hreflang="(?:es|en|x-default)" href="[^"]+">/g, '');
  html = html.replace(/(<link rel="canonical" href="[^"]+">)/, `$1\n  ${alternateLinks(spanishUrl, englishUrl)}`);
  html = html.replace(/\s*<a class="header-tool service-page-language"[\s\S]*?<\/a>/, '');
  html = html.replace(
    '<div class="service-page-header__actions">',
    `<div class="service-page-header__actions">\n        <a class="header-tool service-page-language" href="/en/services/${route.en}/" aria-label="View this service in English" title="English version">EN</a>`
  );
  return html;
}

function englishPage(spanishHtml, route) {
  const spanishUrl = `${site}/servicios/${route.es}/`;
  const englishUrl = `${site}/en/services/${route.en}/`;
  let html = translateHtmlBody(spanishHtml);
  html = translateAttributes(html);
  html = html.replace('<html lang="es-UY">', '<html lang="en" data-static-lang="en">');
  routes.forEach(item => {
    html = html.replaceAll(`/servicios/${item.es}/`, `/en/services/${item.en}/`);
  });
  html = html.replaceAll('href="/#', 'href="/en/#');
  html = html.replaceAll('href="/"', 'href="/en/"');
  html = html.replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${englishUrl}">`);
  html = html.replace(/\s*<link rel="alternate" hreflang="(?:es|en|x-default)" href="[^"]+">/g, '');
  html = html.replace(/(<link rel="canonical" href="[^"]+">)/, `$1\n  ${alternateLinks(spanishUrl, englishUrl)}`);
  html = html.replace(/<meta property="og:locale" content="[^"]+">/, '<meta property="og:locale" content="en_US">');
  html = html.replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${englishUrl}">`);
  html = html.replace(
    /<a class="header-tool service-page-language"[\s\S]*?<\/a>/,
    `<a class="header-tool service-page-language" href="/servicios/${route.es}/" aria-label="View this service in Spanish" title="Spanish version">ES</a>`
  );
  const serviceTitle = (html.match(/<nav class="breadcrumbs"[\s\S]*?<span>([^<]+)<\/span><\/nav>/) || [])[1] || 'this service';
  const whatsapp = encodeURIComponent(`Hello ADONAI ELECTRICAL, I would like to ask about ${serviceTitle}.`);
  html = html.replace(/(<a class="btn service-page-whatsapp" href=")[^"]+("[^>]*>)/, `$1https://wa.me/59898152423?text=${whatsapp}$2`);
  html = translateJsonLd(html);
  return html;
}

for (const route of routes) {
  const spanishPath = path.join(root, 'servicios', route.es, 'index.html');
  let spanishHtml = fs.readFileSync(spanishPath, 'utf8');
  spanishHtml = enrichSpanishPage(spanishHtml, route);
  fs.writeFileSync(spanishPath, spanishHtml, 'utf8');

  const outputDir = path.join(root, 'en', 'services', route.en);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), englishPage(spanishHtml, route), 'utf8');
}

const homeAlternates = alternateLinks(`${site}/`, `${site}/en/`);
const sitemapEntries = [
  { loc: `${site}/`, priority: '1.0', alternates: homeAlternates },
  { loc: `${site}/en/`, priority: '0.8', alternates: homeAlternates },
  ...routes.flatMap(route => {
    const spanishUrl = `${site}/servicios/${route.es}/`;
    const englishUrl = `${site}/en/services/${route.en}/`;
    const alternates = alternateLinks(spanishUrl, englishUrl);
    return [
      { loc: spanishUrl, priority: '0.8', alternates },
      { loc: englishUrl, priority: '0.8', alternates }
    ];
  })
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.map(entry => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${updated}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${entry.priority}</priority>\n    ${entry.alternates.replaceAll('\n', '\n    ')}\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${routes.length} English service pages and updated bilingual service metadata.`);
