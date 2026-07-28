# Google Apps Script para guardar formularios

Usa este ejemplo como base para el Web App que recibirá el formulario desde el frontend.

```javascript
const SHEET_NAME = "Contactos";
const RECIPIENT_EMAIL = "mercadeo@fundecompe.org";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("No existe la hoja de destino.");
    }

    sheet.appendRow([
      payload.createdAt || new Date().toISOString(),
      payload.source || "contacto-web",
      payload.nombre || "",
      payload.email || "",
      payload.telefono || "",
      payload.asunto || "",
      payload.mensaje || "",
      payload.aceptaPolitica ? "Sí" : "No",
      "Nuevo",
    ]);

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: `Nuevo contacto web: ${payload.asunto || "Consulta general"}`,
      body: [
        `Nombre: ${payload.nombre || ""}`,
        `Correo: ${payload.email || ""}`,
        `Teléfono: ${payload.telefono || ""}`,
        `Asunto: ${payload.asunto || ""}`,
        "",
        payload.mensaje || "",
      ].join("\n"),
      replyTo: payload.email || RECIPIENT_EMAIL,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error.message,
      },
      400,
    );
  }
}

function jsonResponse(body, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## Despliegue

1. Crear una hoja de Google.
2. Abrir `Extensiones > Apps Script`.
3. Pegar el script.
4. Publicar como `Web App`.
5. Dar acceso a quien corresponda.
6. Copiar la URL de despliegue y usarla en `FORMS_ENDPOINT`.

## Recomendaciones

- Mantener la hoja solo para uso interno.
- Agregar validaciones adicionales si luego capturan más campos.
- Si el volumen crece o necesitan flujos de seguimiento, migrar a backend serverless o base de datos.
