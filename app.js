/* ADONAI ELECTRICAL — comportamiento del sitio.
   Se carga con defer: corre una vez que el HTML terminó de parsearse. */

/* =========================================================
   Bloqueo de scroll mientras hay un diálogo abierto
   ========================================================= */
(function () {
  /* Mantiene la página en el mismo punto mientras cualquier diálogo está abierto. */
  (() => {
    const state = {
      locked: false,
      scrollY: 0,
      previousTop: '',
      previousPaddingRight: ''
    };

    function lock() {
      if (state.locked) return;
      const body = document.body;
      const scrollbarGap = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      state.locked = true;
      state.scrollY = window.scrollY;
      state.previousTop = body.style.top;
      state.previousPaddingRight = body.style.paddingRight;
      document.documentElement.classList.add('modal-open');
      body.classList.add('modal-open');
      body.style.top = `-${state.scrollY}px`;
      if (scrollbarGap) body.style.paddingRight = `${scrollbarGap}px`;
    }

    function unlock() {
      if (!state.locked) return;
      const body = document.body;
      const root = document.documentElement;
      const scrollY = state.scrollY;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.classList.remove('modal-open');
      body.classList.remove('modal-open');
      body.style.top = state.previousTop;
      body.style.paddingRight = state.previousPaddingRight;
      state.locked = false;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => { root.style.scrollBehavior = previousScrollBehavior; });
    }

    window.adonaiModalScroll = { lock, unlock };
  })();
})();

/* =========================================================
   Contenido y galería de los servicios
   ========================================================= */
(function () {
  /* Contenido editable. Los planos son referencias para presupuestos.
     Las fotos son registros independientes, no la ejecución de esos planos.
     La selección de fotos por categoría puede revisarse antes de publicar. */
  (() => {
    const services = {
      proyectos: {
        title: 'Proyectos nuevos',
        intro: 'Planificación, presupuestos e instalaciones eléctricas para nuevas obras y ampliaciones residenciales e industriales.',
        heading: 'Del plano a la instalación',
        paragraphs: [
          'Estudiamos las necesidades del proyecto y la documentación disponible para definir el alcance del trabajo y preparar un presupuesto.',
          'La galería reúne una referencia de plano utilizada para presupuestar y fotografías independientes de instalaciones en proceso.'
        ],
        scope: ['Estudio de planos y necesidades del proyecto', 'Presupuestos para proyectos nuevos', 'Instalaciones residenciales e industriales', 'Iluminación general para obras y ampliaciones'],
        note: 'El plano se muestra como referencia para la elaboración de un presupuesto. Las fotografías no corresponden necesariamente a esa obra.',
        media: [
          { asset: 'planoNuevo', type: 'image', plan: true, title: 'Estudio de plano eléctrico', caption: 'Detalle de un plano de obra nueva utilizado para preparar un presupuesto. Se omiten los datos identificativos del proyecto.', alt: 'Planta de vivienda con circuitos eléctricos señalados en distintos colores.' },
          { asset: 'canalizacion', type: 'image', title: 'Canalización en obra', caption: 'Registro de una instalación en proceso, con canalización y caja sobre mampostería.', alt: 'Caño naranja y caja eléctrica azul instalados en una pared de ladrillo sin terminar.' },
          { asset: 'puntosElectricos', type: 'image', title: 'Puntos eléctricos en proceso', caption: 'Cajas y mecanismos durante una etapa de instalación, antes de las terminaciones.', alt: 'Pared revocada con cajas eléctricas y mecanismos todavía en proceso de instalación.' }
        ]
      },
      remodelaciones: {
        title: 'Remodelaciones',
        intro: 'Modificaciones y adecuaciones eléctricas para acompañar los cambios de uso y las nuevas necesidades de cada espacio.',
        heading: 'Instalaciones que se adaptan',
        paragraphs: [
          'Evaluamos las modificaciones solicitadas y las condiciones de la instalación existente para preparar un presupuesto de las adecuaciones o reparaciones necesarias.',
          'Compartimos un plano de remodelación utilizado para presupuestar y registros independientes de trabajos de iluminación interior.'
        ],
        scope: ['Presupuestos para modificaciones y reparaciones', 'Adaptación de puntos eléctricos', 'Instalación y renovación de iluminación general'],
        note: 'Las fotografías de iluminación son ejemplos independientes. No se presentan como la ejecución ni como un antes y después del plano mostrado.',
        media: [
          { asset: 'planoRemodelacion', type: 'image', plan: true, title: 'Estudio de una remodelación', caption: 'Detalle del plano de una remodelación utilizado para la elaboración de un presupuesto, sin los datos del cliente.', alt: 'Plano eléctrico de una vivienda en remodelación, con su planta y entrepiso.' },
          { asset: 'iluminacionTejida', type: 'image', title: 'Iluminación interior', caption: 'Registro de un trabajo de iluminación con luminaria colgante encendida.', alt: 'Luminaria colgante con pantalla tejida encendida en un ambiente interior.' },
          { asset: 'iluminacionGeometrica', type: 'image', title: 'Detalle de luminaria', caption: 'Otra vista de los trabajos de iluminación realizados por ADONAI ELECTRICAL.', alt: 'Luminaria colgante de diseño geométrico con luz encendida.' }
        ]
      },
      mantenimiento: {
        title: 'Mantenimiento',
        intro: 'Revisión, diagnóstico y mantenimiento preventivo o correctivo de instalaciones y equipos eléctricos.',
        heading: 'Atención a cada instalación',
        paragraphs: [
          'Cada instalación tiene necesidades diferentes. Evaluamos su estado y las fallas reportadas para definir las tareas de mantenimiento que correspondan.',
          'Preparamos presupuestos para reparaciones y mantenimiento. El alcance, las intervenciones y la coordinación del trabajo se acuerdan según las características del lugar y los equipos involucrados.',
          'Las imágenes de esta galería documentan el estado previo a trabajos de acondicionamiento en protecciones eléctricas y luminarias exteriores.'
        ],
        scope: ['Revisión y diagnóstico de fallas', 'Presupuestos para reparaciones y mantenimiento', 'Mantenimiento preventivo', 'Mantenimiento correctivo'],
        note: 'Registro del estado previo al acondicionamiento. Estas imágenes no muestran los trabajos terminados ni constituyen una certificación de la instalación.',
        media: [
          { asset: 'protecciones', type: 'image', title: 'Protecciones eléctricas', caption: 'Estado previo al acondicionamiento. Vista de los dispositivos de protección y sus conexiones en un gabinete existente.', alt: 'Interruptores eléctricos y conductores dentro de un gabinete metálico antes del acondicionamiento.' },
          { asset: 'luminariaExterior', type: 'image', title: 'Luminaria exterior', caption: 'Estado previo al acondicionamiento. Registro de una luminaria de jardín con daños visibles en su carcasa.', alt: 'Luminaria de jardín instalada verticalmente, con una rotura visible en su cuerpo.' },
          { asset: 'luminariaDesprendida', type: 'image', title: 'Punto de iluminación a acondicionar', caption: 'Estado previo al acondicionamiento. Luminaria exterior desprendida de su base.', alt: 'Luminaria de jardín caída sobre el césped junto a su base.' }
        ]
      },
      iluminacion: {
        title: 'Iluminación de emergencia',
        intro: 'Instalación de luminarias de emergencia como parte de las medidas de protección contra incendios y de los procesos de autorización ante la Dirección Nacional de Bomberos.',
        heading: 'Iluminación disponible cuando más se necesita',
        paragraphs: [
          'Instalamos luminarias de emergencia y revisamos su ubicación, alimentación y funcionamiento de acuerdo con el alcance definido para cada local.',
          'Este trabajo puede formar parte de las medidas previstas en un proyecto de protección contra incendios. La instalación por sí sola no sustituye el proyecto, la certificación ni la autorización que correspondan ante la Dirección Nacional de Bomberos.'
        ],
        scope: ['Instalación de luminarias de emergencia', 'Revisión de alimentación y funcionamiento', 'Adecuaciones eléctricas asociadas', 'Trabajo coordinado con el alcance definido para el proceso ante DNB'],
        note: 'Fotografía de una luminaria de emergencia instalada y en funcionamiento.',
        media: [
          { asset: 'iluminacionEmergencia', type: 'image', title: 'Luminaria de emergencia instalada', caption: 'Equipo instalado sobre pared, conectado a su alimentación y con indicadores de funcionamiento visibles.', alt: 'Luminaria de emergencia rectangular instalada en una pared y conectada a su alimentación eléctrica.' }
        ]
      },
      tramites: {
        title: 'Trámites ante UTE',
        intro: 'Acompañamiento para solicitudes de suministro, rehabilitación y modificación de potencia contratada.',
        heading: 'Te acompañamos en la gestión',
        paragraphs: [
          'Contanos qué necesitás gestionar. Evaluamos tu consulta para definir el alcance de nuestra intervención y preparar una propuesta acorde a tu caso.',
          'Este servicio se brinda desde ADONAI ELECTRICAL. La consulta por la web no constituye una solicitud presentada ante UTE.'
        ],
        scope: ['Solicitud de suministro', 'Solicitud de rehabilitación', 'Modificación de potencia contratada'],
        note: '',
        media: []
      },
      emergencias: {
        title: 'Emergencias eléctricas',
        intro: 'Atención ante interrupciones e imprevistos eléctricos, con una evaluación de la situación y de las alternativas disponibles.',
        heading: 'Respaldo eléctrico para un evento',
        paragraphs: [
          'Una tormenta provocó la caída de una línea y dejó a un salón de fiestas sin suministro eléctrico.',
          'ADONAI ELECTRICAL fue convocada para instalar un generador a combustible y habilitar el uso del salón para la celebración de un cumpleaños.'
        ],
        scope: ['Situación: corte de suministro por tormenta', 'Intervención: instalación de un generador a combustible', 'Objetivo: disponer de energía temporal para el evento'],
        note: 'Video de la intervención. Pulsá reproducir para verlo. Podés activar el sonido desde los controles.',
        media: [
          { asset: 'videoEmergencia', poster: 'portadaEmergencia', type: 'video', title: 'Del generador al salón iluminado', caption: 'Registro de 27 segundos que muestra el generador en el exterior y el interior del salón con iluminación y equipos encendidos.', alt: 'Video de una intervención de respaldo eléctrico en un salón de fiestas.' }
        ]
      },
      camaras: {
        title: 'Instalación de cámaras de seguridad',
        intro: 'Instalación de sistemas de videovigilancia para viviendas, comercios e industrias.',
        heading: 'Seguridad que podés monitorear',
        paragraphs: [
          'Evaluamos el espacio a cubrir para definir la cantidad y ubicación de las cámaras, y preparamos un presupuesto acorde a las necesidades de seguridad de tu hogar o negocio.',
          'Nos encargamos del cableado, la instalación de cámaras y equipo de grabación, y la configuración para que puedas acceder a las imágenes de forma remota.'
        ],
        scope: ['Relevamiento y presupuesto', 'Instalación de cámaras y equipo de grabación', 'Cableado y conexionado', 'Configuración de acceso remoto', 'Mantenimiento de sistemas existentes'],
        note: 'Fotografías y videos de una instalación de cámara de seguridad realizada por ADONAI ELECTRICAL.',
        media: [
          { asset: 'camaraCableado', type: 'image', title: 'Canalización de cables', caption: 'Registro de la canalización de los cables de alimentación y datos hasta el punto de instalación de la cámara.', alt: 'Dos cables, uno blanco y uno azul, tendidos sobre una pared hasta la ubicación de la cámara.' },
          { asset: 'camaraPreparacion', poster: 'portadaPreparacion', type: 'video', title: 'Preparación de los cables', caption: 'Cables pelados y listos dentro de la caja de paso, antes de conectarlos.', alt: 'Video de los cables pelados dentro de una caja de paso, listos para ser conectados.' },
          { asset: 'camaraConexion', type: 'image', title: 'Conexión de cables', caption: 'Conexión de los cables dentro de la caja de paso mediante borneras, sin empalmes improvisados.', alt: 'Caja de paso abierta con los cables conectados mediante conectores rápidos de color naranja.' },
          { asset: 'camaraSellado', poster: 'portadaSellado', type: 'video', title: 'Sellado de la entrada de cables', caption: 'Aplicación de silicona para sellar e impermeabilizar el punto donde el cable entra a la caja de paso.', alt: 'Video de la aplicación de silicona para sellar la entrada de los cables a la caja de paso.' },
          { asset: 'camaraInstalada', type: 'image', title: 'Cámara instalada', caption: 'Cámara de seguridad instalada bajo el alero, ya conectada y en funcionamiento.', alt: 'Cámara de seguridad blanca instalada bajo el techo de chapa de una vivienda.' },
          { asset: 'camaraTerminada', type: 'image', title: 'Instalación terminada', caption: 'Vista general de la cámara instalada en la esquina de la vivienda.', alt: 'Cámara de seguridad instalada en la esquina exterior de una vivienda de pared celeste, junto a una bajada de pluvial.' }
        ]
      }
    };

    const byId = id => document.getElementById(id);
    const tr = text => window.adonaiTranslate ? window.adonaiTranslate(text) : text;
    const dialog = byId('service-dialog');
    const gallery = byId('service-gallery');
    const stage = byId('service-media-stage');
    const thumbnails = byId('service-gallery-thumbs');
    const zoomButton = byId('service-media-zoom');
    const mediaStatus = byId('service-media-status');
    let assetLibrary;
    let activeService;
    let activeIndex = 0;
    let trigger;
    let focusContactOnClose = false;
    let backdropPointerDown = false;

    function asset(id) {
      // La decodificación y la creación del reproductor se difieren hasta abrir la galería.
      // Al ser un HTML autónomo, los bytes sí forman parte de la descarga del archivo.
      if (!assetLibrary) {
        assetLibrary = JSON.parse(byId('service-media-assets').textContent);
        Object.assign(assetLibrary, JSON.parse(byId('emergency-lighting-asset').textContent));
      }
      if (!assetLibrary[id]) throw new Error('Recurso multimedia no disponible');
      return assetLibrary[id];
    }

    function clearMedia() {
      const video = stage.querySelector('video');
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      stage.replaceChildren();
    }

    function showMedia(index) {
      clearMedia();
      activeIndex = (index + activeService.media.length) % activeService.media.length;
      const item = activeService.media[activeIndex];
      stage.classList.toggle('is-plan', Boolean(item.plan));
      stage.classList.remove('is-zoomed');
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
      zoomButton.hidden = item.type === 'video';
      zoomButton.setAttribute('aria-pressed', 'false');
      zoomButton.textContent = tr('Ampliar imagen');
      mediaStatus.textContent = '';
      byId('service-media-title').textContent = tr(item.title);
      byId('service-media-caption').textContent = tr(item.caption);

      try {
        let media;
        if (item.type === 'video') {
          media = document.createElement('video');
          media.controls = true;
          media.preload = 'none';
          media.muted = true;
          media.defaultMuted = true;
          media.setAttribute('playsinline', '');
          media.setAttribute('aria-label', tr(item.alt));
          media.setAttribute('aria-describedby', 'service-media-caption');
          media.poster = asset(item.poster);
          media.textContent = tr('Tu navegador no permite reproducir este video.');
        } else {
          media = document.createElement('img');
          media.alt = tr(item.alt);
          media.decoding = 'async';
          media.draggable = false;
        }
        media.addEventListener('error', () => {
          mediaStatus.textContent = tr('No se pudo mostrar este archivo. Podés consultarnos por este trabajo desde el botón Solicitar cotización.');
        });
        media.src = asset(item.asset);
        stage.append(media);
      } catch (error) {
        mediaStatus.textContent = tr('El material no está disponible. Podés consultarnos directamente por este servicio.');
      }

      thumbnails.querySelectorAll('button').forEach((button, position) => {
        button.setAttribute('aria-pressed', String(position === activeIndex));
      });
    }

    function renderThumbnails() {
      thumbnails.replaceChildren();
      const several = activeService.media.length > 1;
      thumbnails.hidden = !several;
      byId('service-gallery-arrows').hidden = !several;
      if (!several) return;

      activeService.media.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'service-thumbnail';
        button.setAttribute('aria-label', tr('Ver') + ': ' + tr(item.title));
        button.setAttribute('aria-pressed', String(index === 0));
        try {
          const image = document.createElement('img');
          image.alt = '';
          image.decoding = 'async';
          image.src = asset(item.poster || item.asset);
          button.append(image);
        } catch (error) {
          button.textContent = tr(item.title);
        }
        button.addEventListener('click', () => showMedia(index));
        thumbnails.append(button);
      });
    }

    function renderActiveService() {
      if (!activeService) return;
      byId('service-dialog-title').textContent = tr(activeService.title);
      byId('service-dialog-intro').textContent = tr(activeService.intro);
      byId('service-detail-title').textContent = tr(activeService.heading);
      const description = byId('service-detail-description');
      const scope = byId('service-detail-scope');
      description.replaceChildren();
      scope.replaceChildren();

      activeService.paragraphs.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = tr(text);
        description.append(paragraph);
      });
      activeService.scope.forEach(text => {
        const row = document.createElement('div');
        row.className = 'service-detail__item';
        row.textContent = tr(text);
        scope.append(row);
      });

      const hasMedia = activeService.media.length > 0;
      gallery.hidden = !hasMedia;
      byId('service-dialog-layout').classList.toggle('is-information', !hasMedia);
      byId('service-gallery-note').textContent = tr(activeService.note);
      if (hasMedia) {
        renderThumbnails();
        showMedia(0);
      } else {
        clearMedia();
        thumbnails.replaceChildren();
      }
    }

    function openService(key, button) {
      activeService = services[key];
      if (!activeService) return;
      trigger = button;
      focusContactOnClose = false;
      renderActiveService();

      window.adonaiModalScroll?.lock();
      dialog.showModal();
      document.body.classList.add('service-open');
      byId('service-dialog-body').scrollTop = 0;
      byId('service-dialog-close').focus({ preventScroll: true });
    }

    document.querySelectorAll('[data-service]').forEach(button => {
      button.addEventListener('click', () => openService(button.dataset.service, button));
    });
    byId('service-dialog-close').addEventListener('click', () => dialog.close());
    byId('service-media-previous').addEventListener('click', () => showMedia(activeIndex - 1));
    byId('service-media-next').addEventListener('click', () => showMedia(activeIndex + 1));
    zoomButton.addEventListener('click', () => {
      const expanded = stage.classList.toggle('is-zoomed');
      zoomButton.setAttribute('aria-pressed', String(expanded));
      zoomButton.textContent = tr(expanded ? 'Ver imagen completa' : 'Ampliar imagen');
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    });

    // Escape y el foco dentro de la ventana los gestiona el diálogo nativo.
    // El clic exterior se distingue del espacio vacío dentro de la ventana.
    function isOutside(event) {
      const rect = dialog.getBoundingClientRect();
      return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
    }
    dialog.addEventListener('pointerdown', event => { backdropPointerDown = isOutside(event); });
    dialog.addEventListener('click', event => {
      if (backdropPointerDown && isOutside(event)) dialog.close();
      backdropPointerDown = false;
    });
    dialog.addEventListener('close', () => {
      clearMedia();
      thumbnails.replaceChildren();
      document.body.classList.remove('service-open');
      window.adonaiModalScroll?.unlock();
      if (focusContactOnClose) {
        const contact = byId('contacto');
        const title = byId('contact-title');
        title.setAttribute('tabindex', '-1');
        contact.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        title.focus({ preventScroll: true });
      } else if (trigger) {
        trigger.focus({ preventScroll: true });
      }
      focusContactOnClose = false;
    });
    byId('service-dialog-contact').addEventListener('click', event => {
      event.preventDefault();
      focusContactOnClose = true;
      dialog.close();
    });
    window.addEventListener('adonai:languagechange', () => {
      if (dialog.open && activeService) renderActiveService();
    });
  })();
})();

/* =========================================================
   Idioma, tema, navegación, formulario y diálogos
   ========================================================= */
(function () {
      /* Selector de idioma para todo el contenido visible y los mensajes interactivos. */
      const translations = {
        en: {
          "Cargando ADONAI ELECTRICAL": "Loading ADONAI ELECTRICAL",
          "Energía": "Energy",
          "con propósito.": "with purpose.",
          "Energía con propósito.": "Energy with purpose.",
          "Iniciando...": "Starting...",
          "Listo": "Ready",
          "Saltar al contenido": "Skip to content",
          "ADONAI ELECTRICAL, volver al inicio": "ADONAI ELECTRICAL, return to home",
          "Navegación principal": "Main navigation",
          "Inicio": "Home",
          "Nosotros": "About us",
          "Servicios": "Services",
          "Contacto": "Contact",
          "Solicitar cotización": "Request a quote",
          "Abrir ubicación de ADONAI ELECTRICAL en Google Maps": "Open ADONAI ELECTRICAL location in Google Maps",
          "ADONAI ELECTRICAL en Google Maps": "ADONAI ELECTRICAL on Google Maps",
          "Ubicación": "Location",
          "Cambiar idioma": "Change language",
          "Idioma": "Language",
          "Seleccionar idioma": "Select language",
          "Activar modo nocturno": "Enable dark mode",
          "Activar modo claro": "Enable light mode",
          "Cambiar modo de color": "Change color mode",
          "Modo claro u oscuro": "Light or dark mode",
          "Abrir menú": "Open menu",
          "Cerrar menú": "Close menu",
          "Somos una empresa de Salto dedicada a brindar soluciones eléctricas profesionales, seguras y confiables para organizaciones, empresas y particulares.": "We are a Salto-based company providing professional, safe and reliable electrical solutions for organizations, businesses and households.",
          "Conocer la empresa": "Learn about the company",
          "Seguridad": "Safety",
          "Excelencia": "Excellence",
          "Integridad": "Integrity",
          "Compromiso": "Commitment",
          "Nuestra identidad": "Our identity",
          "Una empresa construida sobre principios.": "A company built on principles.",
          "Nuestro propósito orienta la manera en que trabajamos, servimos y construimos el futuro de ADONAI ELECTRICAL.": "Our purpose guides how we work, serve and build the future of ADONAI ELECTRICAL.",
          "Abrir Misión de ADONAI ELECTRICAL": "Open ADONAI ELECTRICAL mission",
          "Propósito actual": "Our purpose today",
          "Misión": "Mission",
          "Soluciones eléctricas profesionales, seguras y confiables, desarrolladas con excelencia e integridad.": "Professional, safe and reliable electrical solutions delivered with excellence and integrity.",
          "Leer Misión completa": "Read the full Mission",
          "Abrir Visión de ADONAI ELECTRICAL": "Open ADONAI ELECTRICAL vision",
          "Proyección a futuro": "Looking ahead",
          "Visión": "Vision",
          "Construir una empresa referente del sector eléctrico en Uruguay que trascienda y deje un legado positivo.": "To build a leading electrical company in Uruguay that endures and leaves a positive legacy.",
          "Leer Visión completa": "Read the full Vision",
          "Una mirada personal sobre nuestro origen": "A personal view of our beginnings",
          "Conoce el propósito que dio vida a ADONAI ELECTRICAL.": "Discover the purpose that brought ADONAI ELECTRICAL to life.",
          "Carta del Fundador": "Founder's Letter",
          "Qué hacemos": "What we do",
          "Servicios eléctricos integrales.": "Complete electrical services.",
          "Instalaciones residenciales, industriales e iluminación general. Presupuestos para proyectos nuevos, modificaciones, reparaciones y mantenimiento, con soluciones adaptadas a cada necesidad.": "Residential and industrial installations and general lighting. Quotes for new projects, alterations, repairs and maintenance, with solutions tailored to each need.",
          "Proyectos nuevos": "New projects",
          "Planificación, presupuesto e instalación eléctrica para nuevas obras y ampliaciones.": "Planning, estimates and electrical installation for new construction and extensions.",
          "Explorar servicio": "Explore service",
          "Remodelaciones": "Remodeling",
          "Presupuestos, modificaciones y adecuaciones de instalaciones eléctricas e iluminación.": "Quotes, alterations and upgrades for electrical and lighting installations.",
          "Mantenimiento": "Maintenance",
          "Diagnóstico y presupuestos para reparaciones y mantenimiento preventivo o correctivo.": "Diagnostics and quotes for repairs and preventive or corrective maintenance.",
          "Emergencias eléctricas": "Electrical emergencies",
          "Atención ante fallas e imprevistos para evaluar el problema y restablecer condiciones seguras.": "Response to faults and unexpected events to assess the problem and restore safe conditions.",
          "Iluminación de emergencia": "Emergency lighting",
          "Instalación de luminarias de emergencia para medidas de protección contra incendios y procesos ante DNB.": "Installation of emergency lighting for fire-protection measures and DNB authorization processes.",
          "Trámites ante UTE": "UTE procedures",
          "Solicitud de suministro, rehabilitación y modificación de potencia contratada.": "New supply, reconnection and contracted-capacity change requests.",
          "Conocer los trámites": "Learn about the procedures",
          "Para abrir la información de los servicios y las galerías, activá JavaScript en tu navegador. También podés": "To open the service information and galleries, enable JavaScript in your browser. You can also",
          "consultarnos directamente": "contact us directly",
          "por cualquiera de nuestros servicios.": "about any of our services.",
          "Opciones de pago": "Payment options",
          "Modalidades para cada proyecto.": "Payment methods for every project.",
          "Contamos con alternativas simples para coordinar el pago de nuestros servicios.": "We offer straightforward options to arrange payment for our services.",
          "Métodos de pago disponibles": "Available payment methods",
          "Efectivo": "Cash",
          "Disponible para el pago de nuestros servicios.": "Available for payment of our services.",
          "Transferencias bancarias": "Bank transfers",
          "Pago mediante transferencia a la cuenta indicada.": "Payment by bank transfer to the designated account.",
          "Cuotas con Mercado Pago": "Installments with Mercado Pago",
          "Financiación sujeta a las condiciones y disponibilidad de la plataforma.": "Financing is subject to the platform's terms and availability.",
          "Hablemos de tu proyecto": "Let's talk about your project",
          "Solicita una cotización.": "Request a quote.",
          "Cuéntanos qué necesitas. Nos pondremos en contacto para evaluar el trabajo y coordinar los próximos pasos.": "Tell us what you need. We will contact you to assess the work and coordinate the next steps.",
          "Teléfono / WhatsApp": "Phone / WhatsApp",
          "Dirección": "Address",
          "Av. Defensa 1599, Salto, Uruguay": "Av. Defensa 1599, Salto, Uruguay",
          "Salto, Uruguay": "Salto, Uruguay",
          "Nombre": "Name",
          "Tu nombre": "Your name",
          "Mensaje": "Message",
          "Describe brevemente el trabajo o la consulta": "Briefly describe the work or your inquiry",
          "Enviar consulta": "Send inquiry",
          "Electricidad residencial e industrial. Proyectos, remodelaciones, mantenimiento y emergencias en Salto, Uruguay.": "Residential and industrial electrical work. Projects, remodeling, maintenance and emergency services in Salto, Uruguay.",
          "Redes sociales": "Social media",
          "Información legal": "Legal information",
          "Privacidad": "Privacy",
          "Términos de uso": "Terms of use",
          "Todos los derechos reservados.": "All rights reserved.",
          "ADONAI ELECTRICAL. Todos los derechos reservados.": "ADONAI ELECTRICAL. All rights reserved.",
          "Contactar a ADONAI ELECTRICAL por WhatsApp": "Contact ADONAI ELECTRICAL on WhatsApp",
          "Nuestros servicios": "Our services",
          "Cerrar": "Close",
          "Galería del servicio": "Service gallery",
          "Imagen anterior": "Previous image",
          "Imagen siguiente": "Next image",
          "Ampliar imagen": "Enlarge image",
          "Ver imagen completa": "View full image",
          "Elegir una imagen": "Choose an image",
          "Ver": "View",
          "Cerrar Misión": "Close Mission",
          "Cerrar Visión": "Close Vision",
          "Cerrar Carta del Fundador": "Close Founder's Letter",
          "Brindar soluciones eléctricas profesionales, seguras y confiables, desarrollando nuestro trabajo con excelencia, responsabilidad, integridad, formación técnica y compromiso con cada persona y organización a la que servimos, buscando que cada trabajo realizado sea una expresión concreta del propósito que guía a ADONAI ELECTRICAL.": "To provide professional, safe and reliable electrical solutions, carrying out our work with excellence, responsibility, integrity, technical training and commitment to every person and organization we serve, seeking to make every completed project a tangible expression of the purpose that guides ADONAI ELECTRICAL.",
          "Ser una empresa referente del sector eléctrico en Uruguay, reconocida por la excelencia de sus servicios, la confiabilidad de su trabajo, la formación y desarrollo de las personas que la integran y la solidez de una organización guiada por un propósito que trasciende el resultado económico.": "To be a benchmark company in Uruguay's electrical sector, recognized for the excellence of its services, the reliability of its work, the training and development of its people, and the strength of an organization guided by a purpose that transcends financial results.",
          "Aspiramos a construir una empresa capaz de crecer de manera sostenible, generar oportunidades de trabajo y formación, aportar valor a la sociedad y dejar un legado que permanezca más allá de quienes dieron origen a la organización.": "We aspire to build a company capable of growing sustainably, creating employment and training opportunities, contributing value to society and leaving a legacy that endures beyond those who founded the organization.",
          "Toda gran empresa nace de una idea. Pero las empresas que dejan huella nacen de un propósito.": "Every great company begins with an idea. But companies that leave a mark are born from a purpose.",
          "ADONAI ELECTRICAL nació con la convicción de que el trabajo bien hecho puede transformar vidas. No la pensé como un simple emprendimiento de instalaciones eléctricas, sino como un instrumento para generar oportunidades, formar profesionales íntegros y dejar un legado que trascienda el resultado económico.": "ADONAI ELECTRICAL was born from the conviction that work done well can transform lives. I did not think of it as a simple electrical installations venture, but as an instrument to create opportunities, develop professionals of integrity and leave a legacy that goes beyond financial results.",
          "Inicié este camino mientras aún trabajaba como empleado, convencido de que podía construir algo más grande que un negocio. Me capacité, crecí profesionalmente, obtuve las habilitaciones necesarias y asumí cada trabajo con el compromiso de ofrecer instalaciones eléctricas seguras, confiables y realizadas conforme a la normativa vigente.": "I began this journey while I was still working as an employee, convinced that I could build something greater than a business. I trained, grew professionally, obtained the necessary authorizations and approached every job with the commitment to provide safe, reliable electrical installations carried out in accordance with current regulations.",
          "Desde el primer día comprendí que la electricidad no es solamente una profesión. Es una enorme responsabilidad. Detrás de cada instalación existen familias, empresas e instituciones que depositan su confianza en nuestro trabajo.": "From the first day, I understood that electricity is not merely a profession. It is an enormous responsibility. Behind every installation are families, businesses and institutions that place their trust in our work.",
          "El nombre ADONAI representa el fundamento sobre el cual decidí construir esta empresa. Mi fe en Jesucristo inspira los principios que deseo reflejar en cada decisión: honestidad, humildad, excelencia, servicio y responsabilidad.": "The name ADONAI represents the foundation on which I chose to build this company. My faith in Jesus Christ inspires the principles I want every decision to reflect: honesty, humility, excellence, service and responsibility.",
          "Creo firmemente que Dios honra el esfuerzo de quienes trabajan con integridad y perseverancia. Mi mayor deseo es que ADONAI ELECTRICAL sea un testimonio vivo de las grandes cosas que Dios puede hacer cuando una persona cree en Sus promesas, pone toda su fe en Él y entrega lo mejor de sí con disciplina y excelencia.": "I firmly believe that God honors the effort of those who work with integrity and perseverance. My greatest hope is that ADONAI ELECTRICAL will be a living testimony to the great things God can do when a person believes in His promises, places all their faith in Him and gives their best with discipline and excellence.",
          "Aspiro a que cada cliente recuerde nuestro profesionalismo, que cada colaborador encuentre aquí una oportunidad real para crecer y que cada familia vinculada a esta empresa se vea beneficiada por un trabajo bien hecho.": "I hope every client remembers our professionalism, every team member finds a real opportunity to grow here, and every family connected to this company benefits from work done well.",
          "Si algún día ADONAI ELECTRICAL llega a convertirse en una empresa referente en Uruguay, espero que nunca olvidemos el principio que dio origen a todo: no comenzamos buscando ser los más grandes; comenzamos buscando ser fieles al propósito que Dios puso en nuestro corazón.": "If ADONAI ELECTRICAL one day becomes a benchmark company in Uruguay, I hope we never forget the principle that gave rise to everything: we did not begin by seeking to be the biggest; we began by seeking to remain faithful to the purpose God placed in our hearts.",
          "Que cada proyecto refleje excelencia. Que cada decisión esté guiada por la integridad. Que cada logro recuerde que toda la gloria pertenece a Dios.": "May every project reflect excellence. May every decision be guided by integrity. May every achievement remind us that all glory belongs to God.",
          "La excelencia honra cada compromiso.": "Excellence honors every commitment.",
          "Fundador": "Founder",
          "Política de privacidad": "Privacy policy",
          "Planificación, presupuestos e instalaciones eléctricas para nuevas obras y ampliaciones residenciales e industriales.": "Planning, quotes and electrical installations for new residential and industrial construction and extensions.",
          "Del plano a la instalación": "From plans to installation",
          "Estudiamos las necesidades del proyecto y la documentación disponible para definir el alcance del trabajo y preparar un presupuesto.": "We study the project's needs and available documentation to define the scope and prepare a quote.",
          "La galería reúne una referencia de plano utilizada para presupuestar y fotografías independientes de instalaciones en proceso.": "The gallery includes a plan reference used for estimating and separate photographs of installations in progress.",
          "Estudio de planos y necesidades del proyecto": "Review of plans and project requirements",
          "Presupuestos para proyectos nuevos": "Quotes for new projects",
          "Instalaciones residenciales e industriales": "Residential and industrial installations",
          "Iluminación general para obras y ampliaciones": "General lighting for construction and extensions",
          "El plano se muestra como referencia para la elaboración de un presupuesto. Las fotografías no corresponden necesariamente a esa obra.": "The plan is shown as a reference used to prepare a quote. The photographs do not necessarily relate to that project.",
          "Estudio de plano eléctrico": "Electrical plan review",
          "Detalle de un plano de obra nueva utilizado para preparar un presupuesto. Se omiten los datos identificativos del proyecto.": "Detail from a new-construction plan used to prepare a quote. Identifying project information has been omitted.",
          "Planta de vivienda con circuitos eléctricos señalados en distintos colores.": "Residential floor plan with electrical circuits marked in different colors.",
          "Canalización en obra": "Conduit installation in progress",
          "Registro de una instalación en proceso, con canalización y caja sobre mampostería.": "An installation in progress, showing conduit and a box on masonry.",
          "Caño naranja y caja eléctrica azul instalados en una pared de ladrillo sin terminar.": "Orange conduit and a blue electrical box installed on an unfinished brick wall.",
          "Puntos eléctricos en proceso": "Electrical points in progress",
          "Cajas y mecanismos durante una etapa de instalación, antes de las terminaciones.": "Boxes and devices during installation, before finishing work.",
          "Pared revocada con cajas eléctricas y mecanismos todavía en proceso de instalación.": "Plastered wall with electrical boxes and devices still being installed.",
          "Modificaciones y adecuaciones eléctricas para acompañar los cambios de uso y las nuevas necesidades de cada espacio.": "Electrical alterations and upgrades to support changes in use and the new needs of each space.",
          "Instalaciones que se adaptan": "Installations that adapt",
          "Evaluamos las modificaciones solicitadas y las condiciones de la instalación existente para preparar un presupuesto de las adecuaciones o reparaciones necesarias.": "We assess the requested changes and the condition of the existing installation to quote the necessary upgrades or repairs.",
          "Compartimos un plano de remodelación utilizado para presupuestar y registros independientes de trabajos de iluminación interior.": "We show a remodeling plan used for estimating and separate records of interior lighting work.",
          "Presupuestos para modificaciones y reparaciones": "Quotes for alterations and repairs",
          "Adaptación de puntos eléctricos": "Electrical point adjustments",
          "Instalación y renovación de iluminación general": "General lighting installation and renewal",
          "Las fotografías de iluminación son ejemplos independientes. No se presentan como la ejecución ni como un antes y después del plano mostrado.": "The lighting photographs are separate examples. They are not presented as execution of, or a before-and-after comparison with, the plan shown.",
          "Estudio de una remodelación": "Remodeling plan review",
          "Detalle del plano de una remodelación utilizado para la elaboración de un presupuesto, sin los datos del cliente.": "Detail from a remodeling plan used to prepare a quote, with client information removed.",
          "Plano eléctrico de una vivienda en remodelación, con su planta y entrepiso.": "Electrical plan of a home being remodeled, including the ground floor and mezzanine.",
          "Iluminación interior": "Interior lighting",
          "Registro de un trabajo de iluminación con luminaria colgante encendida.": "Record of lighting work featuring an illuminated pendant fixture.",
          "Luminaria colgante con pantalla tejida encendida en un ambiente interior.": "Illuminated woven-shade pendant light in an interior space.",
          "Detalle de luminaria": "Light fixture detail",
          "Otra vista de los trabajos de iluminación realizados por ADONAI ELECTRICAL.": "Another view of lighting work completed by ADONAI ELECTRICAL.",
          "Luminaria colgante de diseño geométrico con luz encendida.": "Illuminated geometric pendant fixture.",
          "Revisión, diagnóstico y mantenimiento preventivo o correctivo de instalaciones y equipos eléctricos.": "Inspection, diagnostics and preventive or corrective maintenance of electrical installations and equipment.",
          "Atención a cada instalación": "Care for every installation",
          "Cada instalación tiene necesidades diferentes. Evaluamos su estado y las fallas reportadas para definir las tareas de mantenimiento que correspondan.": "Every installation has different needs. We assess its condition and reported faults to determine the appropriate maintenance work.",
          "Preparamos presupuestos para reparaciones y mantenimiento. El alcance, las intervenciones y la coordinación del trabajo se acuerdan según las características del lugar y los equipos involucrados.": "We prepare quotes for repairs and maintenance. The scope, interventions and scheduling are agreed according to the site and equipment involved.",
          "Las imágenes de esta galería documentan el estado previo a trabajos de acondicionamiento en protecciones eléctricas y luminarias exteriores.": "The images in this gallery document the condition before improvement work on electrical protection devices and outdoor lights.",
          "Revisión y diagnóstico de fallas": "Fault inspection and diagnostics",
          "Presupuestos para reparaciones y mantenimiento": "Quotes for repairs and maintenance",
          "Mantenimiento preventivo": "Preventive maintenance",
          "Mantenimiento correctivo": "Corrective maintenance",
          "Registro del estado previo al acondicionamiento. Estas imágenes no muestran los trabajos terminados ni constituyen una certificación de la instalación.": "Record of the condition before improvement work. These images do not show completed work and do not constitute certification of the installation.",
          "Protecciones eléctricas": "Electrical protection devices",
          "Estado previo al acondicionamiento. Vista de los dispositivos de protección y sus conexiones en un gabinete existente.": "Condition before improvement work. View of protection devices and their connections in an existing cabinet.",
          "Interruptores eléctricos y conductores dentro de un gabinete metálico antes del acondicionamiento.": "Electrical switches and conductors inside a metal cabinet before improvement work.",
          "Luminaria exterior": "Outdoor light fixture",
          "Estado previo al acondicionamiento. Registro de una luminaria de jardín con daños visibles en su carcasa.": "Condition before improvement work. Garden light fixture with visible damage to its housing.",
          "Luminaria de jardín instalada verticalmente, con una rotura visible en su cuerpo.": "Vertically installed garden light with visible damage to its body.",
          "Punto de iluminación a acondicionar": "Lighting point requiring improvement",
          "Estado previo al acondicionamiento. Luminaria exterior desprendida de su base.": "Condition before improvement work. Outdoor light detached from its base.",
          "Luminaria de jardín caída sobre el césped junto a su base.": "Garden light lying on the grass beside its base.",
          "Instalación de luminarias de emergencia como parte de las medidas de protección contra incendios y de los procesos de autorización ante la Dirección Nacional de Bomberos.": "Installation of emergency lighting as part of fire-protection measures and authorization processes before the National Fire Department.",
          "Iluminación disponible cuando más se necesita": "Lighting available when it is needed most",
          "Instalamos luminarias de emergencia y revisamos su ubicación, alimentación y funcionamiento de acuerdo con el alcance definido para cada local.": "We install emergency lights and check their location, power supply and operation according to the scope defined for each property.",
          "Este trabajo puede formar parte de las medidas previstas en un proyecto de protección contra incendios. La instalación por sí sola no sustituye el proyecto, la certificación ni la autorización que correspondan ante la Dirección Nacional de Bomberos.": "This work may form part of the measures specified in a fire-protection project. Installation alone does not replace the applicable project, certification or authorization before the National Fire Department.",
          "Instalación de luminarias de emergencia": "Emergency light installation",
          "Revisión de alimentación y funcionamiento": "Power supply and operation checks",
          "Adecuaciones eléctricas asociadas": "Related electrical upgrades",
          "Trabajo coordinado con el alcance definido para el proceso ante DNB": "Work coordinated with the scope defined for the DNB process",
          "Fotografía de una luminaria de emergencia instalada y en funcionamiento.": "Photograph of an installed and operating emergency light.",
          "Luminaria de emergencia instalada": "Installed emergency light",
          "Equipo instalado sobre pared, conectado a su alimentación y con indicadores de funcionamiento visibles.": "Wall-mounted unit connected to its power supply, with operating indicators visible.",
          "Luminaria de emergencia rectangular instalada en una pared y conectada a su alimentación eléctrica.": "Rectangular emergency light installed on a wall and connected to its electrical supply.",
          "Acompañamiento para solicitudes de suministro, rehabilitación y modificación de potencia contratada.": "Support for new supply, reconnection and contracted-capacity change requests.",
          "Te acompañamos en la gestión": "Support throughout the process",
          "Contanos qué necesitás gestionar. Evaluamos tu consulta para definir el alcance de nuestra intervención y preparar una propuesta acorde a tu caso.": "Tell us what you need to arrange. We assess your inquiry to define our scope and prepare a proposal suited to your case.",
          "Este servicio se brinda desde ADONAI ELECTRICAL. La consulta por la web no constituye una solicitud presentada ante UTE.": "This service is provided by ADONAI ELECTRICAL. An inquiry through this website does not constitute a request submitted to UTE.",
          "Solicitud de suministro": "New supply request",
          "Solicitud de rehabilitación": "Reconnection request",
          "Modificación de potencia contratada": "Contracted-capacity change",
          "Atención ante interrupciones e imprevistos eléctricos, con una evaluación de la situación y de las alternativas disponibles.": "Response to electrical outages and unexpected events, including an assessment of the situation and available alternatives.",
          "Respaldo eléctrico para un evento": "Backup power for an event",
          "Una tormenta provocó la caída de una línea y dejó a un salón de fiestas sin suministro eléctrico.": "A storm brought down a power line and left an event venue without electricity.",
          "ADONAI ELECTRICAL fue convocada para instalar un generador a combustible y habilitar el uso del salón para la celebración de un cumpleaños.": "ADONAI ELECTRICAL was called to install a fuel-powered generator so the venue could be used for a birthday celebration.",
          "Situación: corte de suministro por tormenta": "Situation: storm-related power outage",
          "Intervención: instalación de un generador a combustible": "Intervention: installation of a fuel-powered generator",
          "Objetivo: disponer de energía temporal para el evento": "Objective: provide temporary power for the event",
          "Video de la intervención. Pulsá reproducir para verlo. Podés activar el sonido desde los controles.": "Video of the intervention. Press play to watch it. You can enable sound from the controls.",
          "Del generador al salón iluminado": "From the generator to the illuminated venue",
          "Registro de 27 segundos que muestra el generador en el exterior y el interior del salón con iluminación y equipos encendidos.": "A 27-second recording showing the generator outside and the venue interior with lights and equipment operating.",
          "Video de una intervención de respaldo eléctrico en un salón de fiestas.": "Video of a backup-power intervention at an event venue.",
          "Tu navegador no permite reproducir este video.": "Your browser cannot play this video.",
          "No se pudo mostrar este archivo. Podés consultarnos por este trabajo desde el botón Solicitar cotización.": "This file could not be displayed. You can ask us about this work using the Request a quote button.",
          "El material no está disponible. Podés consultarnos directamente por este servicio.": "This material is unavailable. You can contact us directly about this service.",
          "Consulta": "Inquiry"
        },
        pt: {
          "Cargando ADONAI ELECTRICAL": "Carregando ADONAI ELECTRICAL",
          "Energía": "Energia",
          "con propósito.": "com propósito.",
          "Energía con propósito.": "Energia com propósito.",
          "Iniciando...": "Iniciando...",
          "Listo": "Pronto",
          "Saltar al contenido": "Pular para o conteúdo",
          "ADONAI ELECTRICAL, volver al inicio": "ADONAI ELECTRICAL, voltar ao início",
          "Navegación principal": "Navegação principal",
          "Inicio": "Início",
          "Nosotros": "Sobre nós",
          "Servicios": "Serviços",
          "Contacto": "Contato",
          "Solicitar cotización": "Solicitar orçamento",
          "Abrir ubicación de ADONAI ELECTRICAL en Google Maps": "Abrir a localização da ADONAI ELECTRICAL no Google Maps",
          "ADONAI ELECTRICAL en Google Maps": "ADONAI ELECTRICAL no Google Maps",
          "Ubicación": "Localização",
          "Cambiar idioma": "Alterar idioma",
          "Idioma": "Idioma",
          "Seleccionar idioma": "Selecionar idioma",
          "Activar modo nocturno": "Ativar modo escuro",
          "Activar modo claro": "Ativar modo claro",
          "Cambiar modo de color": "Alterar modo de cor",
          "Modo claro u oscuro": "Modo claro ou escuro",
          "Abrir menú": "Abrir menu",
          "Cerrar menú": "Fechar menu",
          "Somos una empresa de Salto dedicada a brindar soluciones eléctricas profesionales, seguras y confiables para organizaciones, empresas y particulares.": "Somos uma empresa de Salto dedicada a oferecer soluções elétricas profissionais, seguras e confiáveis para organizações, empresas e residências.",
          "Conocer la empresa": "Conhecer a empresa",
          "Seguridad": "Segurança",
          "Excelencia": "Excelência",
          "Integridad": "Integridade",
          "Compromiso": "Compromisso",
          "Nuestra identidad": "Nossa identidade",
          "Una empresa construida sobre principios.": "Uma empresa construída sobre princípios.",
          "Nuestro propósito orienta la manera en que trabajamos, servimos y construimos el futuro de ADONAI ELECTRICAL.": "Nosso propósito orienta a forma como trabalhamos, servimos e construímos o futuro da ADONAI ELECTRICAL.",
          "Abrir Misión de ADONAI ELECTRICAL": "Abrir a Missão da ADONAI ELECTRICAL",
          "Propósito actual": "Propósito atual",
          "Misión": "Missão",
          "Soluciones eléctricas profesionales, seguras y confiables, desarrolladas con excelencia e integridad.": "Soluções elétricas profissionais, seguras e confiáveis, realizadas com excelência e integridade.",
          "Leer Misión completa": "Ler a Missão completa",
          "Abrir Visión de ADONAI ELECTRICAL": "Abrir a Visão da ADONAI ELECTRICAL",
          "Proyección a futuro": "Projeção para o futuro",
          "Visión": "Visão",
          "Construir una empresa referente del sector eléctrico en Uruguay que trascienda y deje un legado positivo.": "Construir uma empresa de referência no setor elétrico uruguaio que transcenda e deixe um legado positivo.",
          "Leer Visión completa": "Ler a Visão completa",
          "Una mirada personal sobre nuestro origen": "Um olhar pessoal sobre nossa origem",
          "Conoce el propósito que dio vida a ADONAI ELECTRICAL.": "Conheça o propósito que deu vida à ADONAI ELECTRICAL.",
          "Carta del Fundador": "Carta do Fundador",
          "Qué hacemos": "O que fazemos",
          "Servicios eléctricos integrales.": "Serviços elétricos completos.",
          "Instalaciones residenciales, industriales e iluminación general. Presupuestos para proyectos nuevos, modificaciones, reparaciones y mantenimiento, con soluciones adaptadas a cada necesidad.": "Instalações residenciais, industriais e iluminação geral. Orçamentos para novos projetos, modificações, reparos e manutenção, com soluções adaptadas a cada necessidade.",
          "Proyectos nuevos": "Novos projetos",
          "Planificación, presupuesto e instalación eléctrica para nuevas obras y ampliaciones.": "Planejamento, orçamento e instalação elétrica para novas obras e ampliações.",
          "Explorar servicio": "Explorar serviço",
          "Remodelaciones": "Reformas",
          "Presupuestos, modificaciones y adecuaciones de instalaciones eléctricas e iluminación.": "Orçamentos, modificações e adequações de instalações elétricas e iluminação.",
          "Mantenimiento": "Manutenção",
          "Diagnóstico y presupuestos para reparaciones y mantenimiento preventivo o correctivo.": "Diagnóstico e orçamentos para reparos e manutenção preventiva ou corretiva.",
          "Emergencias eléctricas": "Emergências elétricas",
          "Atención ante fallas e imprevistos para evaluar el problema y restablecer condiciones seguras.": "Atendimento diante de falhas e imprevistos para avaliar o problema e restabelecer condições seguras.",
          "Iluminación de emergencia": "Iluminação de emergência",
          "Instalación de luminarias de emergencia para medidas de protección contra incendios y procesos ante DNB.": "Instalação de luminárias de emergência para medidas de proteção contra incêndio e processos perante a DNB.",
          "Trámites ante UTE": "Trâmites perante a UTE",
          "Solicitud de suministro, rehabilitación y modificación de potencia contratada.": "Solicitação de fornecimento, religação e alteração da potência contratada.",
          "Conocer los trámites": "Conhecer os trâmites",
          "Para abrir la información de los servicios y las galerías, activá JavaScript en tu navegador. También podés": "Para abrir as informações dos serviços e as galerias, ative o JavaScript no navegador. Você também pode",
          "consultarnos directamente": "falar diretamente conosco",
          "por cualquiera de nuestros servicios.": "sobre qualquer um de nossos serviços.",
          "Opciones de pago": "Opções de pagamento",
          "Modalidades para cada proyecto.": "Modalidades para cada projeto.",
          "Contamos con alternativas simples para coordinar el pago de nuestros servicios.": "Oferecemos alternativas simples para combinar o pagamento de nossos serviços.",
          "Métodos de pago disponibles": "Métodos de pagamento disponíveis",
          "Efectivo": "Dinheiro",
          "Disponible para el pago de nuestros servicios.": "Disponível para o pagamento de nossos serviços.",
          "Transferencias bancarias": "Transferências bancárias",
          "Pago mediante transferencia a la cuenta indicada.": "Pagamento por transferência para a conta indicada.",
          "Cuotas con Mercado Pago": "Parcelas com Mercado Pago",
          "Financiación sujeta a las condiciones y disponibilidad de la plataforma.": "Financiamento sujeito às condições e à disponibilidade da plataforma.",
          "Hablemos de tu proyecto": "Vamos falar sobre seu projeto",
          "Solicita una cotización.": "Solicite um orçamento.",
          "Cuéntanos qué necesitas. Nos pondremos en contacto para evaluar el trabajo y coordinar los próximos pasos.": "Conte-nos o que você precisa. Entraremos em contato para avaliar o trabalho e coordenar os próximos passos.",
          "Teléfono / WhatsApp": "Telefone / WhatsApp",
          "Dirección": "Endereço",
          "Av. Defensa 1599, Salto, Uruguay": "Av. Defensa 1599, Salto, Uruguai",
          "Salto, Uruguay": "Salto, Uruguai",
          "Nombre": "Nome",
          "Tu nombre": "Seu nome",
          "Mensaje": "Mensagem",
          "Describe brevemente el trabajo o la consulta": "Descreva brevemente o trabalho ou a consulta",
          "Enviar consulta": "Enviar consulta",
          "Electricidad residencial e industrial. Proyectos, remodelaciones, mantenimiento y emergencias en Salto, Uruguay.": "Eletricidade residencial e industrial. Projetos, reformas, manutenção e emergências em Salto, Uruguai.",
          "Redes sociales": "Redes sociais",
          "Información legal": "Informações legais",
          "Privacidad": "Privacidade",
          "Términos de uso": "Termos de uso",
          "Todos los derechos reservados.": "Todos os direitos reservados.",
          "ADONAI ELECTRICAL. Todos los derechos reservados.": "ADONAI ELECTRICAL. Todos os direitos reservados.",
          "Contactar a ADONAI ELECTRICAL por WhatsApp": "Entrar em contato com a ADONAI ELECTRICAL pelo WhatsApp",
          "Nuestros servicios": "Nossos serviços",
          "Cerrar": "Fechar",
          "Galería del servicio": "Galeria do serviço",
          "Imagen anterior": "Imagem anterior",
          "Imagen siguiente": "Próxima imagem",
          "Ampliar imagen": "Ampliar imagem",
          "Ver imagen completa": "Ver imagem completa",
          "Elegir una imagen": "Escolher uma imagem",
          "Ver": "Ver",
          "Cerrar Misión": "Fechar Missão",
          "Cerrar Visión": "Fechar Visão",
          "Cerrar Carta del Fundador": "Fechar Carta do Fundador",
          "Brindar soluciones eléctricas profesionales, seguras y confiables, desarrollando nuestro trabajo con excelencia, responsabilidad, integridad, formación técnica y compromiso con cada persona y organización a la que servimos, buscando que cada trabajo realizado sea una expresión concreta del propósito que guía a ADONAI ELECTRICAL.": "Oferecer soluções elétricas profissionais, seguras e confiáveis, desenvolvendo nosso trabalho com excelência, responsabilidade, integridade, formação técnica e compromisso com cada pessoa e organização que atendemos, buscando fazer de cada trabalho realizado uma expressão concreta do propósito que orienta a ADONAI ELECTRICAL.",
          "Ser una empresa referente del sector eléctrico en Uruguay, reconocida por la excelencia de sus servicios, la confiabilidad de su trabajo, la formación y desarrollo de las personas que la integran y la solidez de una organización guiada por un propósito que trasciende el resultado económico.": "Ser uma empresa de referência no setor elétrico do Uruguai, reconhecida pela excelência de seus serviços, pela confiabilidade de seu trabalho, pela formação e desenvolvimento das pessoas que a integram e pela solidez de uma organização guiada por um propósito que transcende o resultado econômico.",
          "Aspiramos a construir una empresa capaz de crecer de manera sostenible, generar oportunidades de trabajo y formación, aportar valor a la sociedad y dejar un legado que permanezca más allá de quienes dieron origen a la organización.": "Aspiramos construir uma empresa capaz de crescer de maneira sustentável, gerar oportunidades de trabalho e formação, agregar valor à sociedade e deixar um legado que permaneça além daqueles que deram origem à organização.",
          "Toda gran empresa nace de una idea. Pero las empresas que dejan huella nacen de un propósito.": "Toda grande empresa nasce de uma ideia. Mas as empresas que deixam uma marca nascem de um propósito.",
          "ADONAI ELECTRICAL nació con la convicción de que el trabajo bien hecho puede transformar vidas. No la pensé como un simple emprendimiento de instalaciones eléctricas, sino como un instrumento para generar oportunidades, formar profesionales íntegros y dejar un legado que trascienda el resultado económico.": "A ADONAI ELECTRICAL nasceu com a convicção de que o trabalho bem feito pode transformar vidas. Não a pensei como um simples empreendimento de instalações elétricas, mas como um instrumento para gerar oportunidades, formar profissionais íntegros e deixar um legado que vá além do resultado econômico.",
          "Inicié este camino mientras aún trabajaba como empleado, convencido de que podía construir algo más grande que un negocio. Me capacité, crecí profesionalmente, obtuve las habilitaciones necesarias y asumí cada trabajo con el compromiso de ofrecer instalaciones eléctricas seguras, confiables y realizadas conforme a la normativa vigente.": "Iniciei este caminho enquanto ainda trabalhava como empregado, convencido de que poderia construir algo maior do que um negócio. Me capacitei, cresci profissionalmente, obtive as habilitações necessárias e assumi cada trabalho com o compromisso de oferecer instalações elétricas seguras, confiáveis e realizadas de acordo com as normas vigentes.",
          "Desde el primer día comprendí que la electricidad no es solamente una profesión. Es una enorme responsabilidad. Detrás de cada instalación existen familias, empresas e instituciones que depositan su confianza en nuestro trabajo.": "Desde o primeiro dia, compreendi que a eletricidade não é apenas uma profissão. É uma enorme responsabilidade. Por trás de cada instalação existem famílias, empresas e instituições que depositam sua confiança em nosso trabalho.",
          "El nombre ADONAI representa el fundamento sobre el cual decidí construir esta empresa. Mi fe en Jesucristo inspira los principios que deseo reflejar en cada decisión: honestidad, humildad, excelencia, servicio y responsabilidad.": "O nome ADONAI representa o fundamento sobre o qual decidi construir esta empresa. Minha fé em Jesus Cristo inspira os princípios que desejo refletir em cada decisão: honestidade, humildade, excelência, serviço e responsabilidade.",
          "Creo firmemente que Dios honra el esfuerzo de quienes trabajan con integridad y perseverancia. Mi mayor deseo es que ADONAI ELECTRICAL sea un testimonio vivo de las grandes cosas que Dios puede hacer cuando una persona cree en Sus promesas, pone toda su fe en Él y entrega lo mejor de sí con disciplina y excelencia.": "Acredito firmemente que Deus honra o esforço daqueles que trabalham com integridade e perseverança. Meu maior desejo é que a ADONAI ELECTRICAL seja um testemunho vivo das grandes coisas que Deus pode fazer quando uma pessoa acredita em Suas promessas, coloca toda a sua fé Nele e entrega o melhor de si com disciplina e excelência.",
          "Aspiro a que cada cliente recuerde nuestro profesionalismo, que cada colaborador encuentre aquí una oportunidad real para crecer y que cada familia vinculada a esta empresa se vea beneficiada por un trabajo bien hecho.": "Desejo que cada cliente se lembre de nosso profissionalismo, que cada colaborador encontre aqui uma oportunidade real para crescer e que cada família ligada a esta empresa seja beneficiada por um trabalho bem feito.",
          "Si algún día ADONAI ELECTRICAL llega a convertirse en una empresa referente en Uruguay, espero que nunca olvidemos el principio que dio origen a todo: no comenzamos buscando ser los más grandes; comenzamos buscando ser fieles al propósito que Dios puso en nuestro corazón.": "Se algum dia a ADONAI ELECTRICAL se tornar uma empresa de referência no Uruguai, espero que nunca esqueçamos o princípio que deu origem a tudo: não começamos buscando ser os maiores; começamos buscando ser fiéis ao propósito que Deus colocou em nosso coração.",
          "Que cada proyecto refleje excelencia. Que cada decisión esté guiada por la integridad. Que cada logro recuerde que toda la gloria pertenece a Dios.": "Que cada projeto reflita excelência. Que cada decisão seja guiada pela integridade. Que cada conquista nos lembre de que toda a glória pertence a Deus.",
          "La excelencia honra cada compromiso.": "A excelência honra cada compromisso.",
          "Fundador": "Fundador",
          "Política de privacidad": "Política de privacidade",
          "Planificación, presupuestos e instalaciones eléctricas para nuevas obras y ampliaciones residenciales e industriales.": "Planejamento, orçamentos e instalações elétricas para novas obras e ampliações residenciais e industriais.",
          "Del plano a la instalación": "Do projeto à instalação",
          "Estudiamos las necesidades del proyecto y la documentación disponible para definir el alcance del trabajo y preparar un presupuesto.": "Estudamos as necessidades do projeto e a documentação disponível para definir o escopo do trabalho e preparar um orçamento.",
          "La galería reúne una referencia de plano utilizada para presupuestar y fotografías independientes de instalaciones en proceso.": "A galeria reúne uma referência de planta usada para orçamento e fotografias independentes de instalações em andamento.",
          "Estudio de planos y necesidades del proyecto": "Análise de plantas e necessidades do projeto",
          "Presupuestos para proyectos nuevos": "Orçamentos para novos projetos",
          "Instalaciones residenciales e industriales": "Instalações residenciais e industriais",
          "Iluminación general para obras y ampliaciones": "Iluminação geral para obras e ampliações",
          "El plano se muestra como referencia para la elaboración de un presupuesto. Las fotografías no corresponden necesariamente a esa obra.": "A planta é apresentada como referência para a elaboração de um orçamento. As fotografias não correspondem necessariamente a essa obra.",
          "Estudio de plano eléctrico": "Análise de planta elétrica",
          "Detalle de un plano de obra nueva utilizado para preparar un presupuesto. Se omiten los datos identificativos del proyecto.": "Detalhe de uma planta de obra nova utilizada para preparar um orçamento. Os dados de identificação do projeto foram omitidos.",
          "Planta de vivienda con circuitos eléctricos señalados en distintos colores.": "Planta residencial com circuitos elétricos indicados em cores diferentes.",
          "Canalización en obra": "Eletrodutos em obra",
          "Registro de una instalación en proceso, con canalización y caja sobre mampostería.": "Registro de uma instalação em andamento, com eletroduto e caixa sobre alvenaria.",
          "Caño naranja y caja eléctrica azul instalados en una pared de ladrillo sin terminar.": "Eletroduto laranja e caixa elétrica azul instalados em uma parede de tijolos sem acabamento.",
          "Puntos eléctricos en proceso": "Pontos elétricos em execução",
          "Cajas y mecanismos durante una etapa de instalación, antes de las terminaciones.": "Caixas e mecanismos durante uma etapa da instalação, antes dos acabamentos.",
          "Pared revocada con cajas eléctricas y mecanismos todavía en proceso de instalación.": "Parede rebocada com caixas elétricas e mecanismos ainda em processo de instalação.",
          "Modificaciones y adecuaciones eléctricas para acompañar los cambios de uso y las nuevas necesidades de cada espacio.": "Modificações e adequações elétricas para acompanhar mudanças de uso e novas necessidades de cada espaço.",
          "Instalaciones que se adaptan": "Instalações que se adaptam",
          "Evaluamos las modificaciones solicitadas y las condiciones de la instalación existente para preparar un presupuesto de las adecuaciones o reparaciones necesarias.": "Avaliamos as modificações solicitadas e as condições da instalação existente para preparar um orçamento das adequações ou reparos necessários.",
          "Compartimos un plano de remodelación utilizado para presupuestar y registros independientes de trabajos de iluminación interior.": "Apresentamos uma planta de reforma utilizada para orçamento e registros independentes de trabalhos de iluminação interna.",
          "Presupuestos para modificaciones y reparaciones": "Orçamentos para modificações e reparos",
          "Adaptación de puntos eléctricos": "Adaptação de pontos elétricos",
          "Instalación y renovación de iluminación general": "Instalação e renovação da iluminação geral",
          "Las fotografías de iluminación son ejemplos independientes. No se presentan como la ejecución ni como un antes y después del plano mostrado.": "As fotografias de iluminação são exemplos independentes. Não são apresentadas como execução nem como comparação de antes e depois da planta exibida.",
          "Estudio de una remodelación": "Análise de uma reforma",
          "Detalle del plano de una remodelación utilizado para la elaboración de un presupuesto, sin los datos del cliente.": "Detalhe da planta de uma reforma utilizada para elaborar um orçamento, sem os dados do cliente.",
          "Plano eléctrico de una vivienda en remodelación, con su planta y entrepiso.": "Planta elétrica de uma residência em reforma, incluindo o piso térreo e o mezanino.",
          "Iluminación interior": "Iluminação interna",
          "Registro de un trabajo de iluminación con luminaria colgante encendida.": "Registro de um trabalho de iluminação com luminária pendente acesa.",
          "Luminaria colgante con pantalla tejida encendida en un ambiente interior.": "Luminária pendente com cúpula trançada acesa em um ambiente interno.",
          "Detalle de luminaria": "Detalhe da luminária",
          "Otra vista de los trabajos de iluminación realizados por ADONAI ELECTRICAL.": "Outra vista dos trabalhos de iluminação realizados pela ADONAI ELECTRICAL.",
          "Luminaria colgante de diseño geométrico con luz encendida.": "Luminária pendente de design geométrico acesa.",
          "Revisión, diagnóstico y mantenimiento preventivo o correctivo de instalaciones y equipos eléctricos.": "Inspeção, diagnóstico e manutenção preventiva ou corretiva de instalações e equipamentos elétricos.",
          "Atención a cada instalación": "Cuidado com cada instalação",
          "Cada instalación tiene necesidades diferentes. Evaluamos su estado y las fallas reportadas para definir las tareas de mantenimiento que correspondan.": "Cada instalação tem necessidades diferentes. Avaliamos seu estado e as falhas relatadas para definir as tarefas de manutenção adequadas.",
          "Preparamos presupuestos para reparaciones y mantenimiento. El alcance, las intervenciones y la coordinación del trabajo se acuerdan según las características del lugar y los equipos involucrados.": "Preparamos orçamentos para reparos e manutenção. O escopo, as intervenções e a coordenação do trabalho são definidos de acordo com as características do local e dos equipamentos envolvidos.",
          "Las imágenes de esta galería documentan el estado previo a trabajos de acondicionamiento en protecciones eléctricas y luminarias exteriores.": "As imagens desta galeria documentam o estado anterior aos trabalhos de adequação em proteções elétricas e luminárias externas.",
          "Revisión y diagnóstico de fallas": "Inspeção e diagnóstico de falhas",
          "Presupuestos para reparaciones y mantenimiento": "Orçamentos para reparos e manutenção",
          "Mantenimiento preventivo": "Manutenção preventiva",
          "Mantenimiento correctivo": "Manutenção corretiva",
          "Registro del estado previo al acondicionamiento. Estas imágenes no muestran los trabajos terminados ni constituyen una certificación de la instalación.": "Registro do estado anterior à adequação. Estas imagens não mostram os trabalhos concluídos nem constituem uma certificação da instalação.",
          "Protecciones eléctricas": "Proteções elétricas",
          "Estado previo al acondicionamiento. Vista de los dispositivos de protección y sus conexiones en un gabinete existente.": "Estado anterior à adequação. Vista dos dispositivos de proteção e suas conexões em um quadro existente.",
          "Interruptores eléctricos y conductores dentro de un gabinete metálico antes del acondicionamiento.": "Disjuntores e condutores dentro de um quadro metálico antes da adequação.",
          "Luminaria exterior": "Luminária externa",
          "Estado previo al acondicionamiento. Registro de una luminaria de jardín con daños visibles en su carcasa.": "Estado anterior à adequação. Registro de uma luminária de jardim com danos visíveis em sua carcaça.",
          "Luminaria de jardín instalada verticalmente, con una rotura visible en su cuerpo.": "Luminária de jardim instalada verticalmente, com uma ruptura visível em seu corpo.",
          "Punto de iluminación a acondicionar": "Ponto de iluminação a adequar",
          "Estado previo al acondicionamiento. Luminaria exterior desprendida de su base.": "Estado anterior à adequação. Luminária externa solta de sua base.",
          "Luminaria de jardín caída sobre el césped junto a su base.": "Luminária de jardim caída sobre a grama ao lado de sua base.",
          "Instalación de luminarias de emergencia como parte de las medidas de protección contra incendios y de los procesos de autorización ante la Dirección Nacional de Bomberos.": "Instalação de luminárias de emergência como parte das medidas de proteção contra incêndio e dos processos de autorização perante a Direção Nacional de Bombeiros.",
          "Iluminación disponible cuando más se necesita": "Iluminação disponível quando mais se precisa",
          "Instalamos luminarias de emergencia y revisamos su ubicación, alimentación y funcionamiento de acuerdo con el alcance definido para cada local.": "Instalamos luminárias de emergência e verificamos sua localização, alimentação e funcionamento de acordo com o escopo definido para cada local.",
          "Este trabajo puede formar parte de las medidas previstas en un proyecto de protección contra incendios. La instalación por sí sola no sustituye el proyecto, la certificación ni la autorización que correspondan ante la Dirección Nacional de Bomberos.": "Este trabalho pode fazer parte das medidas previstas em um projeto de proteção contra incêndio. A instalação, por si só, não substitui o projeto, a certificação nem a autorização correspondentes perante a Direção Nacional de Bombeiros.",
          "Instalación de luminarias de emergencia": "Instalação de luminárias de emergência",
          "Revisión de alimentación y funcionamiento": "Verificação da alimentação e do funcionamento",
          "Adecuaciones eléctricas asociadas": "Adequações elétricas associadas",
          "Trabajo coordinado con el alcance definido para el proceso ante DNB": "Trabalho coordenado com o escopo definido para o processo perante a DNB",
          "Fotografía de una luminaria de emergencia instalada y en funcionamiento.": "Fotografia de uma luminária de emergência instalada e em funcionamento.",
          "Luminaria de emergencia instalada": "Luminária de emergência instalada",
          "Equipo instalado sobre pared, conectado a su alimentación y con indicadores de funcionamiento visibles.": "Equipamento instalado na parede, conectado à alimentação e com indicadores de funcionamento visíveis.",
          "Luminaria de emergencia rectangular instalada en una pared y conectada a su alimentación eléctrica.": "Luminária de emergência retangular instalada em uma parede e conectada à alimentação elétrica.",
          "Acompañamiento para solicitudes de suministro, rehabilitación y modificación de potencia contratada.": "Acompanhamento para solicitações de fornecimento, religação e alteração da potência contratada.",
          "Te acompañamos en la gestión": "Acompanhamos você no processo",
          "Contanos qué necesitás gestionar. Evaluamos tu consulta para definir el alcance de nuestra intervención y preparar una propuesta acorde a tu caso.": "Conte-nos o que você precisa solicitar. Avaliamos sua consulta para definir o escopo de nossa intervenção e preparar uma proposta adequada ao seu caso.",
          "Este servicio se brinda desde ADONAI ELECTRICAL. La consulta por la web no constituye una solicitud presentada ante UTE.": "Este serviço é prestado pela ADONAI ELECTRICAL. A consulta pelo site não constitui uma solicitação apresentada à UTE.",
          "Solicitud de suministro": "Solicitação de fornecimento",
          "Solicitud de rehabilitación": "Solicitação de religação",
          "Modificación de potencia contratada": "Alteração da potência contratada",
          "Atención ante interrupciones e imprevistos eléctricos, con una evaluación de la situación y de las alternativas disponibles.": "Atendimento diante de interrupções e imprevistos elétricos, com avaliação da situação e das alternativas disponíveis.",
          "Respaldo eléctrico para un evento": "Energia de respaldo para um evento",
          "Una tormenta provocó la caída de una línea y dejó a un salón de fiestas sin suministro eléctrico.": "Uma tempestade derrubou uma linha e deixou um salão de festas sem fornecimento de energia.",
          "ADONAI ELECTRICAL fue convocada para instalar un generador a combustible y habilitar el uso del salón para la celebración de un cumpleaños.": "A ADONAI ELECTRICAL foi chamada para instalar um gerador a combustível e permitir o uso do salão para a comemoração de um aniversário.",
          "Situación: corte de suministro por tormenta": "Situação: interrupção do fornecimento causada por tempestade",
          "Intervención: instalación de un generador a combustible": "Intervenção: instalação de um gerador a combustível",
          "Objetivo: disponer de energía temporal para el evento": "Objetivo: fornecer energia temporária para o evento",
          "Video de la intervención. Pulsá reproducir para verlo. Podés activar el sonido desde los controles.": "Vídeo da intervenção. Pressione reproduzir para assistir. Você pode ativar o som nos controles.",
          "Del generador al salón iluminado": "Do gerador ao salão iluminado",
          "Registro de 27 segundos que muestra el generador en el exterior y el interior del salón con iluminación y equipos encendidos.": "Registro de 27 segundos que mostra o gerador no exterior e o interior do salão com iluminação e equipamentos ligados.",
          "Video de una intervención de respaldo eléctrico en un salón de fiestas.": "Vídeo de uma intervenção de energia de respaldo em um salão de festas.",
          "Tu navegador no permite reproducir este video.": "Seu navegador não consegue reproduzir este vídeo.",
          "No se pudo mostrar este archivo. Podés consultarnos por este trabajo desde el botón Solicitar cotización.": "Não foi possível exibir este arquivo. Você pode falar conosco sobre este trabalho pelo botão Solicitar orçamento.",
          "El material no está disponible. Podés consultarnos directamente por este servicio.": "Este material não está disponível. Você pode falar diretamente conosco sobre este serviço.",
          "Consulta": "Consulta"
        }
      };


      /* Textos incorporados en la revisión de septiembre 2026. */
      Object.assign(translations.en, {
        "Instalaciones eléctricas en Salto, Uruguay": "Electrical installations in Salto, Uruguay",
        "Valores fundamentales de ADONAI ELECTRICAL": "ADONAI ELECTRICAL core values",
        "Instalación de cámaras de seguridad": "Security camera installation",
        "Instalación de sistemas de videovigilancia para viviendas, comercios e industrias.": "Installation of video surveillance systems for homes, businesses and industrial sites.",
        "Seguridad que podés monitorear": "Security you can monitor",
        "Evaluamos el espacio a cubrir para definir la cantidad y ubicación de las cámaras, y preparamos un presupuesto acorde a las necesidades de seguridad de tu hogar o negocio.": "We assess the area to be covered to determine the number and placement of cameras, and prepare a quote suited to your home's or business's security needs.",
        "Nos encargamos del cableado, la instalación de cámaras y equipo de grabación, y la configuración para que puedas acceder a las imágenes de forma remota.": "We handle the wiring, the installation of cameras and recording equipment, and the setup so you can access the footage remotely.",
        "Relevamiento y presupuesto": "Site survey and quote",
        "Instalación de cámaras y equipo de grabación": "Installation of cameras and recording equipment",
        "Cableado y conexionado": "Wiring and connections",
        "Configuración de acceso remoto": "Remote access setup",
        "Mantenimiento de sistemas existentes": "Maintenance of existing systems",
        "Fotografías y videos de una instalación de cámara de seguridad realizada por ADONAI ELECTRICAL.": "Photographs and videos of a security camera installation carried out by ADONAI ELECTRICAL.",
        "Preparación de los cables": "Preparing the cables",
        "Cables pelados y listos dentro de la caja de paso, antes de conectarlos.": "Cables stripped and ready inside the junction box, before connecting them.",
        "Video de los cables pelados dentro de una caja de paso, listos para ser conectados.": "Video of the stripped cables inside a junction box, ready to be connected.",
        "Sellado de la entrada de cables": "Sealing the cable entry point",
        "Aplicación de silicona para sellar e impermeabilizar el punto donde el cable entra a la caja de paso.": "Applying silicone to seal and waterproof the point where the cable enters the junction box.",
        "Video de la aplicación de silicona para sellar la entrada de los cables a la caja de paso.": "Video of the silicone being applied to seal the cables' entry point into the junction box.",
        "Canalización de cables": "Cable routing",
        "Registro de la canalización de los cables de alimentación y datos hasta el punto de instalación de la cámara.": "Record of the power and data cable routing to the camera's installation point.",
        "Dos cables, uno blanco y uno azul, tendidos sobre una pared hasta la ubicación de la cámara.": "Two cables, one white and one blue, running along a wall to the camera's location.",
        "Conexión de cables": "Cable connection",
        "Conexión de los cables dentro de la caja de paso mediante borneras, sin empalmes improvisados.": "Cables connected inside the junction box using terminal connectors, with no improvised splices.",
        "Caja de paso abierta con los cables conectados mediante conectores rápidos de color naranja.": "Open junction box with the cables connected using orange quick-connectors.",
        "Cámara instalada": "Camera installed",
        "Cámara de seguridad instalada bajo el alero, ya conectada y en funcionamiento.": "Security camera installed under the eave, already connected and working.",
        "Cámara de seguridad blanca instalada bajo el techo de chapa de una vivienda.": "White security camera installed under a home's sheet-metal roof.",
        "Instalación terminada": "Finished installation",
        "Vista general de la cámara instalada en la esquina de la vivienda.": "General view of the camera installed on the corner of the house.",
        "Cámara de seguridad instalada en la esquina exterior de una vivienda de pared celeste, junto a una bajada de pluvial.": "Security camera installed on the outside corner of a light-blue house, next to a downspout.",
        "Teléfono": "Phone",
        "Email": "Email",
        "Email (opcional)": "Email (optional)",
        "nombre@correo.com": "name@email.com",
        "099 123 456": "099 123 456",
        "No completar": "Do not fill in",
        "Enviar consulta": "Send inquiry",
        "Tu consulta se enviará directamente a ADONAI ELECTRICAL. También puedes escribirnos por WhatsApp.": "Your inquiry will be sent directly to ADONAI ELECTRICAL. You can also contact us via WhatsApp.",
        "Consulta enviada. Nos pondremos en contacto contigo pronto.": "Inquiry sent. We will contact you soon.",
        "No pudimos enviar la consulta. Inténtalo nuevamente o escríbenos por WhatsApp.": "We could not send the inquiry. Please try again or contact us via WhatsApp.",
        "Enviando consulta…": "Sending inquiry…",
        "Nueva consulta desde la web": "New inquiry from the website",
        "Horarios de atención": "Opening hours",
        "Lunes a viernes": "Monday to Friday",
        "Sábados": "Saturdays",
        "7:00 a 18:00": "7:00 am to 6:00 pm",
        "8:00 a 16:00": "8:00 am to 4:00 pm",
        "Emergencias eléctricas: las 24 horas, los 7 días de la semana.": "Electrical emergencies: 24 hours a day, 7 days a week.",
        "Firma Instaladora autorizada por UTE · Técnico Instalador Categoría C": "Installation firm authorised by UTE · Installer Technician, Category C",
        "Excelencia": "Excellence",
        "Integridad": "Integrity",
        "Responsabilidad": "Accountability",
        "Seguridad": "Safety",
        "Servicio": "Service",
        "Compromiso": "Commitment",
        "Formación y Desarrollo": "Training and Development",
        "Disciplina": "Discipline",
        "Humildad": "Humility",
        "Técnico Instalador · Categoría C ante UTE": "Installer Technician · UTE Category C",
        "Cuenta con diez años de experiencia en trabajos eléctricos, incluyendo mantenimientos, emergencias e instalaciones nuevas. Se formó en UTU y hace dos años fundó ADONAI ELECTRICAL, convencido de que el trabajo bien hecho puede transformar vidas.": "He has ten years of experience in electrical work, including maintenance, emergencies and new installations. He trained at UTU and founded ADONAI ELECTRICAL two years ago, convinced that work done well can transform lives.",
        "Su trabajo se concentra principalmente en instalaciones residenciales y modificaciones de instalaciones existentes. También ha realizado proyectos eléctricos para espacios comerciales y salones de eventos. Está habilitado por UTE como Técnico Instalador Categoría C, y ADONAI ELECTRICAL se encuentra registrada ante el organismo como Firma Instaladora.": "His work focuses mainly on residential installations and modifications to existing installations. He has also completed electrical projects for commercial spaces and event venues. He is authorised by UTE as a Category C Installer Technician, and ADONAI ELECTRICAL is registered with the utility as an installation firm.",
        "Política de privacidad": "Privacy policy",
        "Responsable: ADONAI ELECTRICAL, RUT 220020810013, Av. Defensa 1599, Salto, Uruguay. Contacto: adonaielectrical2026@gmail.com.": "Data controller: ADONAI ELECTRICAL, tax ID 220020810013, Av. Defensa 1599, Salto, Uruguay. Contact: adonaielectrical2026@gmail.com.",
        "Qué pedimos y para qué. Nombre, teléfono, correo si lo dejás y el texto de tu consulta, únicamente para responderte y preparar un presupuesto. No los vendemos, no los cedemos con fines comerciales y no los usamos para publicidad.": "What we ask for and why. Name, phone, your email if you provide it, and your enquiry — only to reply to you and prepare a quote. We do not sell them, share them commercially or use them for advertising.",
        "Cómo se envía. El formulario se envía directamente a nuestro correo mediante FormSubmit, un servicio externo que actúa como intermediario de envío. Si preferís, también podés escribirnos por WhatsApp, correo o llamada.": "How it is sent. The form is submitted directly to our inbox through FormSubmit, an external service that acts as a delivery intermediary. If you prefer, you can also reach us via WhatsApp, email or phone.",
        "Qué se guarda. No usamos cookies, analítica ni publicidad; solo quedan en tu equipo el idioma y el tema que elijas. La tipografía se carga desde Google Fonts, por lo que tu IP llega a sus servidores.": "What is stored. We use no cookies, analytics or advertising; only your language and theme choices stay on your own device. The typeface loads from Google Fonts, so your IP reaches its servers.",
        "Tus derechos. Conservamos las consultas mientras dure la relación comercial. La Ley N° 18.331 te permite acceder a tus datos, rectificarlos, actualizarlos y pedir su supresión escribiéndonos; también podés reclamar ante la URCDP.": "Your rights. We keep enquiries for as long as the working relationship lasts. Uruguayan Law No. 18,331 lets you access, correct, update and request deletion of your data by writing to us; you may also complain to the URCDP.",
        "Última actualización: setiembre de 2026.": "Last updated: September 2026.",
        "Términos de uso": "Terms of use",
        "Alcance. Los contenidos del sitio son generales. Servicios, plazos e imágenes no constituyen una oferta vinculante: cada trabajo se define en un presupuesto individual, con alcance, precio y condiciones, confirmado antes de comenzar.": "Scope. The content of this site is general. Services, timeframes and images are not a binding offer: every job is defined in an individual quote, with scope, price and conditions, confirmed before work begins.",
        "Contenido técnico. Los planos y esquemas son referencias de trabajos propios. No sustituyen un relevamiento ni un proyecto firmado, ni sirven de guía para ejecutar una instalación por cuenta propia: toda instalación conectada a las redes de UTE debe ejecutarla una firma instaladora y un técnico registrados.": "Technical content. The plans and diagrams are references from our own work. They do not replace a site survey or a signed project, nor serve as a guide to carry out an installation yourself: any installation connected to the UTE grid must be done by a registered installation firm and technician.",
        "Galería. Las fotografías son registros de trabajos realizados; cuando acompañan a un plano son ejemplos independientes, no la ejecución de ese plano.": "Gallery. The photographs are records of completed work; when shown with a plan they are independent examples, not the execution of that plan.",
        "Emergencias. Se atienden las 24 horas, todos los días, sujeto a la disponibilidad del equipo y la distancia. Los horarios administrativos son los de la sección Contacto.": "Emergencies. Attended 24 hours a day, every day, subject to team availability and distance. Administrative hours are those in the Contact section.",
        "Propiedad intelectual y enlaces. El nombre, el logotipo, los textos y las imágenes de ADONAI ELECTRICAL no pueden usarse sin autorización escrita. El sitio enlaza a plataformas de terceros sobre cuyo contenido no tenemos control. Rige la legislación de la República Oriental del Uruguay.": "Intellectual property and links. The ADONAI ELECTRICAL name, logo, texts and images may not be used without written permission. The site links to third-party platforms whose content we do not control. Uruguayan law applies."
  });
      Object.assign(translations.pt, {
        "Instalaciones eléctricas en Salto, Uruguay": "Instalações elétricas em Salto, Uruguai",
        "Instalación de cámaras de seguridad": "Instalação de câmeras de segurança",
        "Instalación de sistemas de videovigilancia para viviendas, comercios e industrias.": "Instalação de sistemas de videovigilância para residências, comércios e indústrias.",
        "Seguridad que podés monitorear": "Segurança que você pode monitorar",
        "Evaluamos el espacio a cubrir para definir la cantidad y ubicación de las cámaras, y preparamos un presupuesto acorde a las necesidades de seguridad de tu hogar o negocio.": "Avaliamos o espaço a ser coberto para definir a quantidade e a localização das câmeras, e preparamos um orçamento de acordo com as necessidades de segurança da sua casa ou negócio.",
        "Nos encargamos del cableado, la instalación de cámaras y equipo de grabación, y la configuración para que puedas acceder a las imágenes de forma remota.": "Cuidamos do cabeamento, da instalação das câmeras e do equipamento de gravação, e da configuração para que você possa acessar as imagens remotamente.",
        "Relevamiento y presupuesto": "Levantamento e orçamento",
        "Instalación de cámaras y equipo de grabación": "Instalação de câmeras e equipamento de gravação",
        "Cableado y conexionado": "Cabeamento e conexões",
        "Configuración de acceso remoto": "Configuração de acesso remoto",
        "Mantenimiento de sistemas existentes": "Manutenção de sistemas existentes",
        "Fotografías y videos de una instalación de cámara de seguridad realizada por ADONAI ELECTRICAL.": "Fotografias e vídeos de uma instalação de câmera de segurança realizada pela ADONAI ELECTRICAL.",
        "Preparación de los cables": "Preparação dos cabos",
        "Cables pelados y listos dentro de la caja de paso, antes de conectarlos.": "Cabos desencapados e prontos dentro da caixa de passagem, antes de conectá-los.",
        "Video de los cables pelados dentro de una caja de paso, listos para ser conectados.": "Vídeo dos cabos desencapados dentro de uma caixa de passagem, prontos para serem conectados.",
        "Sellado de la entrada de cables": "Vedação da entrada dos cabos",
        "Aplicación de silicona para sellar e impermeabilizar el punto donde el cable entra a la caja de paso.": "Aplicação de silicone para vedar e impermeabilizar o ponto onde o cabo entra na caixa de passagem.",
        "Video de la aplicación de silicona para sellar la entrada de los cables a la caja de paso.": "Vídeo da aplicação de silicone para vedar a entrada dos cabos na caixa de passagem.",
        "Canalización de cables": "Passagem dos cabos",
        "Registro de la canalización de los cables de alimentación y datos hasta el punto de instalación de la cámara.": "Registro da passagem dos cabos de alimentação e dados até o ponto de instalação da câmera.",
        "Dos cables, uno blanco y uno azul, tendidos sobre una pared hasta la ubicación de la cámara.": "Dois cabos, um branco e um azul, passados sobre uma parede até o local da câmera.",
        "Conexión de cables": "Conexão dos cabos",
        "Conexión de los cables dentro de la caja de paso mediante borneras, sin empalmes improvisados.": "Conexão dos cabos dentro da caixa de passagem por meio de conectores, sem emendas improvisadas.",
        "Caja de paso abierta con los cables conectados mediante conectores rápidos de color naranja.": "Caixa de passagem aberta com os cabos conectados por meio de conectores rápidos de cor laranja.",
        "Cámara instalada": "Câmera instalada",
        "Cámara de seguridad instalada bajo el alero, ya conectada y en funcionamiento.": "Câmera de segurança instalada sob o beiral, já conectada e em funcionamento.",
        "Cámara de seguridad blanca instalada bajo el techo de chapa de una vivienda.": "Câmera de segurança branca instalada sob o telhado de chapa de uma residência.",
        "Instalación terminada": "Instalação concluída",
        "Vista general de la cámara instalada en la esquina de la vivienda.": "Vista geral da câmera instalada na esquina da residência.",
        "Cámara de seguridad instalada en la esquina exterior de una vivienda de pared celeste, junto a una bajada de pluvial.": "Câmera de segurança instalada na esquina externa de uma casa de parede azul-clara, ao lado de um tubo de descida pluvial.",
        "Valores fundamentales de ADONAI ELECTRICAL": "Valores fundamentais da ADONAI ELECTRICAL",
        "Teléfono": "Telefone",
        "Email": "E-mail",
        "Email (opcional)": "E-mail (opcional)",
        "nombre@correo.com": "nome@email.com",
        "099 123 456": "099 123 456",
        "No completar": "Não preencher",
        "Enviar consulta": "Enviar consulta",
        "Tu consulta se enviará directamente a ADONAI ELECTRICAL. También puedes escribirnos por WhatsApp.": "Sua consulta será enviada diretamente à ADONAI ELECTRICAL. Você também pode falar conosco pelo WhatsApp.",
        "Consulta enviada. Nos pondremos en contacto contigo pronto.": "Consulta enviada. Entraremos em contato em breve.",
        "No pudimos enviar la consulta. Inténtalo nuevamente o escríbenos por WhatsApp.": "Não foi possível enviar a consulta. Tente novamente ou fale conosco pelo WhatsApp.",
        "Enviando consulta…": "Enviando consulta…",
        "Nueva consulta desde la web": "Nova consulta pelo site",
        "Horarios de atención": "Horário de atendimento",
        "Lunes a viernes": "Segunda a sexta",
        "Sábados": "Sábados",
        "7:00 a 18:00": "7h às 18h",
        "8:00 a 16:00": "8h às 16h",
        "Emergencias eléctricas: las 24 horas, los 7 días de la semana.": "Emergências elétricas: 24 horas por dia, 7 dias por semana.",
        "Firma Instaladora autorizada por UTE · Técnico Instalador Categoría C": "Empresa instaladora autorizada pela UTE · Técnico Instalador Categoria C",
        "Excelencia": "Excelência",
        "Integridad": "Integridade",
        "Responsabilidad": "Responsabilidade",
        "Seguridad": "Segurança",
        "Servicio": "Serviço",
        "Compromiso": "Comprometimento",
        "Formación y Desarrollo": "Formação e Desenvolvimento",
        "Disciplina": "Disciplina",
        "Humildad": "Humildade",
        "Técnico Instalador · Categoría C ante UTE": "Técnico Instalador · Categoria C perante a UTE",
        "Cuenta con diez años de experiencia en trabajos eléctricos, incluyendo mantenimientos, emergencias e instalaciones nuevas. Se formó en UTU y hace dos años fundó ADONAI ELECTRICAL, convencido de que el trabajo bien hecho puede transformar vidas.": "Ele tem dez anos de experiência em trabalhos elétricos, incluindo manutenções, emergências e novas instalações. Formou-se na UTU e fundou a ADONAI ELECTRICAL há dois anos, convencido de que um trabalho bem feito pode transformar vidas.",
        "Su trabajo se concentra principalmente en instalaciones residenciales y modificaciones de instalaciones existentes. También ha realizado proyectos eléctricos para espacios comerciales y salones de eventos. Está habilitado por UTE como Técnico Instalador Categoría C, y ADONAI ELECTRICAL se encuentra registrada ante el organismo como Firma Instaladora.": "Seu trabalho se concentra principalmente em instalações residenciais e modificações de instalações existentes. Também realizou projetos elétricos para espaços comerciais e salões de eventos. É autorizado pela UTE como Técnico Instalador Categoria C, e a ADONAI ELECTRICAL está registrada no órgão como Empresa Instaladora.",
        "Política de privacidad": "Política de privacidade",
        "Responsable: ADONAI ELECTRICAL, RUT 220020810013, Av. Defensa 1599, Salto, Uruguay. Contacto: adonaielectrical2026@gmail.com.": "Responsável: ADONAI ELECTRICAL, RUT 220020810013, Av. Defensa 1599, Salto, Uruguai. Contato: adonaielectrical2026@gmail.com.",
        "Qué pedimos y para qué. Nombre, teléfono, correo si lo dejás y el texto de tu consulta, únicamente para responderte y preparar un presupuesto. No los vendemos, no los cedemos con fines comerciales y no los usamos para publicidad.": "O que pedimos e para quê. Nome, telefone, e-mail se você deixar e o texto da sua consulta, apenas para responder e preparar um orçamento. Não os vendemos, não os cedemos com fins comerciais e não os usamos para publicidade.",
        "Cómo se envía. El formulario se envía directamente a nuestro correo mediante FormSubmit, un servicio externo que actúa como intermediario de envío. Si preferís, también podés escribirnos por WhatsApp, correo o llamada.": "Como é enviada. O formulário é enviado diretamente para o nosso e-mail através do FormSubmit, um serviço externo que atua como intermediário de envio. Se preferir, você também pode falar conosco pelo WhatsApp, e-mail ou telefone.",
        "Qué se guarda. No usamos cookies, analítica ni publicidad; solo quedan en tu equipo el idioma y el tema que elijas. La tipografía se carga desde Google Fonts, por lo que tu IP llega a sus servidores.": "O que fica guardado. Não usamos cookies, análise nem publicidade; só ficam no seu aparelho o idioma e o tema que escolher. A tipografia é carregada do Google Fonts, portanto seu IP chega aos servidores dele.",
        "Tus derechos. Conservamos las consultas mientras dure la relación comercial. La Ley N° 18.331 te permite acceder a tus datos, rectificarlos, actualizarlos y pedir su supresión escribiéndonos; también podés reclamar ante la URCDP.": "Seus direitos. Guardamos as consultas enquanto durar a relação comercial. A Lei n° 18.331 permite acessar seus dados, retificá-los, atualizá-los e pedir sua exclusão escrevendo para nós; você também pode reclamar à URCDP.",
        "Última actualización: setiembre de 2026.": "Última atualização: setembro de 2026.",
        "Términos de uso": "Termos de uso",
        "Alcance. Los contenidos del sitio son generales. Servicios, plazos e imágenes no constituyen una oferta vinculante: cada trabajo se define en un presupuesto individual, con alcance, precio y condiciones, confirmado antes de comenzar.": "Alcance. Os conteúdos do site são gerais. Serviços, prazos e imagens não constituem oferta vinculante: cada trabalho é definido em um orçamento individual, com escopo, preço e condições, confirmado antes de começar.",
        "Contenido técnico. Los planos y esquemas son referencias de trabajos propios. No sustituyen un relevamiento ni un proyecto firmado, ni sirven de guía para ejecutar una instalación por cuenta propia: toda instalación conectada a las redes de UTE debe ejecutarla una firma instaladora y un técnico registrados.": "Conteúdo técnico. As plantas e esquemas são referências de trabalhos próprios. Não substituem um levantamento nem um projeto assinado, nem servem de guia para executar uma instalação por conta própria: toda instalação ligada às redes da UTE deve ser executada por uma empresa instaladora e um técnico registrados.",
        "Galería. Las fotografías son registros de trabajos realizados; cuando acompañan a un plano son ejemplos independientes, no la ejecución de ese plano.": "Galeria. As fotografias são registros de trabalhos realizados; quando acompanham uma planta são exemplos independentes, não a execução daquela planta.",
        "Emergencias. Se atienden las 24 horas, todos los días, sujeto a la disponibilidad del equipo y la distancia. Los horarios administrativos son los de la sección Contacto.": "Emergências. Atendidas 24 horas por dia, todos os dias, sujeito à disponibilidade da equipe e à distância. Os horários administrativos são os da seção Contato.",
        "Propiedad intelectual y enlaces. El nombre, el logotipo, los textos y las imágenes de ADONAI ELECTRICAL no pueden usarse sin autorización escrita. El sitio enlaza a plataformas de terceros sobre cuyo contenido no tenemos control. Rige la legislación de la República Oriental del Uruguay.": "Propriedade intelectual e links. O nome, o logotipo, os textos e as imagens da ADONAI ELECTRICAL não podem ser usados sem autorização por escrito. O site tem links para plataformas de terceiros cujo conteúdo não controlamos. Aplica-se a legislação uruguaia."
  });

      const pageMetadata = {
        es: {
          title: 'Electricista en Salto, Uruguay | ADONAI ELECTRICAL',
          description: 'Electricista en Salto, Uruguay: instalaciones eléctricas residenciales e industriales, remodelaciones, mantenimiento, emergencias y trámites ante UTE.'
        },
        en: {
          title: 'Electrician in Salto | ADONAI ELECTRICAL — Electrical installations',
          description: 'ADONAI ELECTRICAL: residential and industrial electrical installations, maintenance, emergency response and new projects in Salto, Uruguay.'
        },
        pt: {
          title: 'Eletricista em Salto | ADONAI ELECTRICAL — Instalações elétricas',
          description: 'ADONAI ELECTRICAL: instalações elétricas residenciais e industriais, manutenção, emergências e novos projetos em Salto, Uruguai.'
        }
      };

      const whatsappMessages = {
        es: 'Hola ADONAI ELECTRICAL, quisiera realizar una consulta.',
        en: 'Hello ADONAI ELECTRICAL, I would like to make an inquiry.',
        pt: 'Olá ADONAI ELECTRICAL, gostaria de fazer uma consulta.'
      };

      let currentLanguage = 'es';
      const translatableTextNodes = [];
      const translatableAttributes = [];
      const languageAttributeNames = ['aria-label', 'title', 'placeholder'];

      function translateLiteral(text) {
        if (currentLanguage === 'es') return text;
        return translations[currentLanguage]?.[text] || text;
      }

      window.adonaiTranslate = translateLiteral;

      function collectTranslatableContent() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style, svg, template')) return NodeFilter.FILTER_REJECT;
            return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        });

        let node;
        while ((node = walker.nextNode())) {
          translatableTextNodes.push({ node, original: node.nodeValue });
        }

        document.querySelectorAll('[aria-label], [title], [placeholder]').forEach(element => {
          languageAttributeNames.forEach(name => {
            if (element.hasAttribute(name)) {
              translatableAttributes.push({ element, name, original: element.getAttribute(name) });
            }
          });
        });
      }

      function applyLanguage(language, savePreference = false) {
        currentLanguage = ['es', 'en', 'pt'].includes(language) ? language : 'es';
        window.adonaiTranslate = translateLiteral;
        document.documentElement.lang = currentLanguage === 'es' ? 'es-UY' : currentLanguage === 'pt' ? 'pt-BR' : 'en';

        translatableTextNodes.forEach(item => {
          const trimmed = item.original.trim();
          const start = item.original.indexOf(trimmed);
          item.node.nodeValue = item.original.slice(0, start) + translateLiteral(trimmed) + item.original.slice(start + trimmed.length);
        });

        translatableAttributes.forEach(item => {
          item.element.setAttribute(item.name, translateLiteral(item.original));
        });

        const metadata = pageMetadata[currentLanguage];
        document.title = metadata.title;
        document.querySelector('meta[name="description"]').setAttribute('content', metadata.description);
        document.getElementById('language-select').value = currentLanguage;
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
          whatsappFloat.href = 'https://wa.me/59898152423?text=' + encodeURIComponent(whatsappMessages[currentLanguage]);
        }

        if (savePreference) {
          try { localStorage.setItem('adonai-language', currentLanguage); } catch (error) {}
        }

        window.dispatchEvent(new CustomEvent('adonai:languagechange', { detail: { language: currentLanguage } }));
      }

      /* Reutiliza el maestro de alta resolución para las marcas de agua. */
      function cloneBrandMark(target, className, suffix) {
        const source = document.getElementById('brand-logo-master');
        if (!source || !target) return;
        const clone = source.cloneNode(true);
        clone.removeAttribute('id');
        clone.removeAttribute('hidden');
        clone.className = 'brand-bolt-icon brand-logo-image';
        clone.setAttribute('aria-hidden', 'true');
        const wrapper = className ? document.createElement('span') : target;
        if (className) wrapper.className = className;
        wrapper.setAttribute('aria-hidden', 'true');
        wrapper.append(clone);
        if (className) target.append(wrapper);
      }

      const hero = document.querySelector('.hero');
      cloneBrandMark(hero, 'hero-brand-watermark', 'hero');
      document.querySelectorAll('.identity-card').forEach((card, index) => {
        cloneBrandMark(card, 'identity-card__watermark', 'identity-' + index);
      });
      document.querySelectorAll('.service-card').forEach((card, index) => {
        cloneBrandMark(card, 'service-card__watermark', 'service-' + index);
      });

      collectTranslatableContent();
      let initialLanguage = 'es';
      try { initialLanguage = localStorage.getItem('adonai-language') || 'es'; } catch (error) {}
      applyLanguage(initialLanguage);
      document.getElementById('language-select').addEventListener('change', event => {
        applyLanguage(event.target.value, true);
      });

      /* Modo Claro / Oscuro */
      const themeToggle = document.getElementById('theme-toggle');
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');

      function applyTheme(theme, savePreference = false) {
        const isDark = theme === 'dark';
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', translateLiteral(isDark ? 'Activar modo claro' : 'Activar modo nocturno'));
        themeToggle.title = translateLiteral(isDark ? 'Activar modo claro' : 'Activar modo nocturno');
        themeColorMeta.setAttribute('content', isDark ? '#0b0c0e' : '#ffffff');

        if (savePreference) {
          try { localStorage.setItem('adonai-theme', isDark ? 'dark' : 'light'); } catch (error) {}
        }
      }

      applyTheme(document.documentElement.dataset.theme || 'light');
      themeToggle.addEventListener('click', () => {
        applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
      });

      /* Controlador de Pantalla de Carga (Preloader) y Transición de Inicio */
      const preloader = document.getElementById('app-preloader');
      const preloaderBarFill = document.getElementById('preloader-bar-fill');
      const preloaderStatus = document.getElementById('preloader-status');
      let preloaderAnimationTimer = null;

      /* La pantalla de carga se oculta cuando la página terminó de cargar de
         verdad, con un tope de 1,5 s para que nunca demore de más. El respaldo
         en CSS la destapa aunque este script falle. */
      function hidePreloader() {
        if (!preloader || preloader.classList.contains('is-hidden')) return;
        if (preloaderBarFill) {
          preloaderBarFill.style.animation = 'none';
          preloaderBarFill.style.width = '100%';
        }
        if (preloaderStatus) preloaderStatus.textContent = translateLiteral('Listo');
        preloader.classList.add('is-hidden');
      }

      if (document.readyState === 'complete') {
        hidePreloader();
      } else {
        window.addEventListener('load', hidePreloader, { once: true });
        setTimeout(hidePreloader, 1500);
      }

      /* Navegación móvil y clicks suaves */
      const menuButton = document.querySelector('.menu-toggle');
      const mainNav = document.querySelector('.main-nav');
      const navLinks = document.querySelectorAll('.nav-link');
      const brandLink = document.querySelector('.brand');

      function setMenu(open) {
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', translateLiteral(open ? 'Cerrar menú' : 'Abrir menú'));
        mainNav.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
        if (open) mainNav.scrollTop = 0;
      }

      window.addEventListener('adonai:languagechange', () => {
        applyTheme(document.documentElement.dataset.theme || 'light');
        setMenu(menuButton.getAttribute('aria-expanded') === 'true');
      });

      menuButton.addEventListener('click', () => {
        setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
      });

      document.addEventListener('click', event => {
        if (menuButton.getAttribute('aria-expanded') !== 'true') return;
        if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
      });

      function navigateToHomeWithLoading() {
        setMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#inicio');
        });
      }

      if (brandLink) {
        brandLink.addEventListener('click', event => {
          event.preventDefault();
          navigateToHomeWithLoading();
        });
      }

      navLinks.forEach(link => {
        link.addEventListener('click', event => {
          setMenu(false);
          if (link.getAttribute('href') === '#inicio') {
            event.preventDefault();
            navigateToHomeWithLoading();
          }
        });
      });

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenu(false);
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 940) setMenu(false);
      });

      /* Scroll reveal animations */
      const revealElements = document.querySelectorAll('.reveal');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if ('IntersectionObserver' in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.13, rootMargin: '0px 0px -45px' });

        revealElements.forEach(element => revealObserver.observe(element));
      } else {
        revealElements.forEach(element => element.classList.add('is-visible'));
      }

      const sections = document.querySelectorAll('header[id], section[id]');
      if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
          });
        }, { rootMargin: '-35% 0px -55%', threshold: 0 });

        sections.forEach(section => sectionObserver.observe(section));
      }

      /* Formulario */
      const form = document.getElementById('contact-form');
      const formStatus = document.getElementById('form-status');

      form.addEventListener('submit', async event => {
        event.preventDefault();

        /* Campo trampa: si viene completo es un bot, se descarta en silencio. */
        const honeypot = document.getElementById('company');
        if (honeypot && honeypot.value.trim()) return;

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const submitButton = form.querySelector('button[type="submit"]');
        const data = new FormData(form);
        data.set('_subject', 'Nueva consulta desde la web — ADONAI ELECTRICAL');
        data.set('_template', 'table');
        data.set('_captcha', 'false');
        formStatus.textContent = 'Enviando consulta…';
        if (submitButton) submitButton.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('FormSubmit error');
          form.reset();
          formStatus.textContent = translateLiteral('Consulta enviada. Nos pondremos en contacto contigo pronto.');
        } catch (error) {
          formStatus.textContent = translateLiteral('No pudimos enviar la consulta. Inténtalo nuevamente o escríbenos por WhatsApp.');
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });

      /* Modales Misión y Visión */
      const missionDialog = document.getElementById('mission-dialog');
      const missionOpen = document.getElementById('mission-open');
      const missionClose = document.getElementById('mission-close');

      if (missionOpen && missionDialog) {
        missionOpen.addEventListener('click', () => {
          window.adonaiModalScroll?.lock();
          missionDialog.showModal();
        });
        missionClose.addEventListener('click', () => missionDialog.close());
        missionDialog.addEventListener('click', event => {
          if (event.target === missionDialog) missionDialog.close();
        });
      }

      const visionDialog = document.getElementById('vision-dialog');
      const visionOpen = document.getElementById('vision-open');
      const visionClose = document.getElementById('vision-close');

      if (visionOpen && visionDialog) {
        visionOpen.addEventListener('click', () => {
          window.adonaiModalScroll?.lock();
          visionDialog.showModal();
        });
        visionClose.addEventListener('click', () => visionDialog.close());
        visionDialog.addEventListener('click', event => {
          if (event.target === visionDialog) visionDialog.close();
        });
      }

      /* Carta del Fundador */
      const founderDialog = document.getElementById('founder-dialog');
      const founderOpen = document.getElementById('founder-open');
      const founderClose = document.getElementById('founder-close');

      founderOpen.addEventListener('click', () => {
        window.adonaiModalScroll?.lock();
        founderDialog.showModal();
      });
      founderClose.addEventListener('click', () => founderDialog.close());
      founderDialog.addEventListener('click', event => {
        if (event.target === founderDialog) founderDialog.close();
      });

      /* Información legal */
      const legalDialog = document.getElementById('legal-dialog');
      const legalTitle = document.getElementById('legal-title');
      const legalContent = document.getElementById('legal-content');
      const dialogClose = document.getElementById('dialog-close');

      const legalText = {
        privacy: {
          title: "Política de privacidad",
          paragraphs: [
            "Responsable: ADONAI ELECTRICAL, RUT 220020810013, Av. Defensa 1599, Salto, Uruguay. Contacto: adonaielectrical2026@gmail.com.",
            "Qué pedimos y para qué. Nombre, teléfono, correo si lo dejás y el texto de tu consulta, únicamente para responderte y preparar un presupuesto. No los vendemos, no los cedemos con fines comerciales y no los usamos para publicidad.",
            "Cómo se envía. El formulario se envía directamente a nuestro correo mediante FormSubmit, un servicio externo que actúa como intermediario de envío. Si preferís, también podés escribirnos por WhatsApp, correo o llamada.",
            "Qué se guarda. No usamos cookies, analítica ni publicidad; solo quedan en tu equipo el idioma y el tema que elijas. La tipografía se carga desde Google Fonts, por lo que tu IP llega a sus servidores.",
            "Tus derechos. Conservamos las consultas mientras dure la relación comercial. La Ley N° 18.331 te permite acceder a tus datos, rectificarlos, actualizarlos y pedir su supresión escribiéndonos; también podés reclamar ante la URCDP.",
            "Última actualización: setiembre de 2026."
          ]
        },
        terms: {
          title: "Términos de uso",
          paragraphs: [
            "Alcance. Los contenidos del sitio son generales. Servicios, plazos e imágenes no constituyen una oferta vinculante: cada trabajo se define en un presupuesto individual, con alcance, precio y condiciones, confirmado antes de comenzar.",
            "Contenido técnico. Los planos y esquemas son referencias de trabajos propios. No sustituyen un relevamiento ni un proyecto firmado, ni sirven de guía para ejecutar una instalación por cuenta propia: toda instalación conectada a las redes de UTE debe ejecutarla una firma instaladora y un técnico registrados.",
            "Galería. Las fotografías son registros de trabajos realizados; cuando acompañan a un plano son ejemplos independientes, no la ejecución de ese plano.",
            "Emergencias. Se atienden las 24 horas, todos los días, sujeto a la disponibilidad del equipo y la distancia. Los horarios administrativos son los de la sección Contacto.",
            "Propiedad intelectual y enlaces. El nombre, el logotipo, los textos y las imágenes de ADONAI ELECTRICAL no pueden usarse sin autorización escrita. El sitio enlaza a plataformas de terceros sobre cuyo contenido no tenemos control. Rige la legislación de la República Oriental del Uruguay.",
            "Última actualización: setiembre de 2026."
          ]
        }
      };

      let activeLegalKey = null;

      function renderLegalContent(key) {
        const item = legalText[key];
        if (!item) return;
        legalTitle.textContent = translateLiteral(item.title);
        const columnas = document.createElement('div');
        columnas.className = 'legal-columns';
        item.paragraphs.forEach(text => {
          const paragraph = document.createElement('p');
          paragraph.textContent = translateLiteral(text);
          columnas.append(paragraph);
        });
        legalContent.replaceChildren(columnas);
      }

      document.querySelectorAll('[data-legal]').forEach(button => {
        button.addEventListener('click', () => {
          activeLegalKey = button.dataset.legal;
          renderLegalContent(activeLegalKey);
          window.adonaiModalScroll?.lock();
          legalDialog.showModal();
        });
      });

      window.addEventListener('adonai:languagechange', () => {
        if (legalDialog.open && activeLegalKey) renderLegalContent(activeLegalKey);
      });

      dialogClose.addEventListener('click', () => legalDialog.close());
      legalDialog.addEventListener('click', event => {
        if (event.target === legalDialog) legalDialog.close();
      });

      const pageDialogs = Array.from(document.querySelectorAll('dialog'));
      pageDialogs.forEach(modal => {
        modal.addEventListener('close', () => {
          if (!pageDialogs.some(item => item.open)) window.adonaiModalScroll?.unlock();
        });
      });

      /* Año automático. Se vuelve a aplicar tras cada cambio de idioma:
         applyLanguage() reescribe todos los nodos de texto capturados al
         cargar la página, incluido este, con su valor original ("2026"). */
      function updateFooterYear() {
        document.getElementById('year').textContent = new Date().getFullYear();
      }
      updateFooterYear();
      window.addEventListener('adonai:languagechange', updateFooterYear);
})();
