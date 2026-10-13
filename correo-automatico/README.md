# Correo automático de ADONAI ELECTRICAL

Este código reemplaza el autorespondedor genérico de FormSubmit por un envío controlado desde la cuenta de ADONAI ELECTRICAL.

## Qué resuelve

- Envía la consulta completa a `adonaielectrical2026@gmail.com`.
- Envía al cliente una confirmación con asunto, diseño y texto propios.
- Usa español para el formulario principal e inglés para la versión `/en/`.
- Permite responder directamente al cliente desde la notificación recibida.
- Mantiene el campo trampa contra envíos automatizados.

## Implementación activa

- Proyecto: `Correo automático web - ADONAI ELECTRICAL`.
- Tipo: **Aplicación web**.
- Ejecutar como: **Yo**.
- Acceso: **Cualquiera**.
- URL pública: `https://script.google.com/macros/s/AKfycbxHTMyb5a34w6k1IhQCO7Mw3L-q3Y-p4DLwt__obO0sI9mZJQqqiXG_2aQi48yOdpserA/exec`.
- Prueba de `doGet` y `doPost`: completadas correctamente el 13 de octubre de 2026.

## Activación o actualización futura

1. Crear un proyecto nuevo en Google Apps Script desde la cuenta `adonaielectrical2026@gmail.com`.
2. Copiar el contenido de `Code.gs` en el editor.
3. Implementar como **Aplicación web** con estas opciones:
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
4. Autorizar el envío de correo y copiar la URL terminada en `/exec`.
5. Sustituir la dirección `action` del formulario de `index.html` por esa URL, si cambia la implementación.
6. Regenerar la versión inglesa con `node build-lang.js en` y publicar.
7. Hacer una prueba con un correo propio antes de darlo por terminado.

El formulario publicado utiliza la aplicación web indicada arriba. Si se crea una implementación nueva con otra URL, hay que actualizar `index.html` y volver a generar la versión inglesa.
