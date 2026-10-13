# Correo automático de ADONAI ELECTRICAL

Este código reemplaza el autorespondedor genérico de FormSubmit por un envío controlado desde la cuenta de ADONAI ELECTRICAL.

## Qué resuelve

- Envía la consulta completa a `adonaielectrical2026@gmail.com`.
- Envía al cliente una confirmación con asunto, diseño y texto propios.
- Usa español para el formulario principal e inglés para la versión `/en/`.
- Permite responder directamente al cliente desde la notificación recibida.
- Mantiene el campo trampa contra envíos automatizados.

## Activación

1. Crear un proyecto nuevo en Google Apps Script desde la cuenta `adonaielectrical2026@gmail.com`.
2. Copiar el contenido de `Code.gs` en el editor.
3. Implementar como **Aplicación web** con estas opciones:
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
4. Autorizar el envío de correo y copiar la URL terminada en `/exec`.
5. Sustituir la dirección `action` del formulario de `index.html` por esa URL.
6. Regenerar la versión inglesa con `node build-lang.js en` y publicar.
7. Hacer una prueba con un correo propio antes de darlo por terminado.

Hasta completar estos pasos, el formulario publicado continúa usando FormSubmit para no interrumpir la recepción de consultas.
