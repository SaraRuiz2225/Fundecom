# Fundecompe Redesign

Rediseño institucional de Fundecompe en React + Vite, basado en los mockups de `stitch_fundecompe_website_redesign` y preparado para despliegue con Docker.

## Requisitos

- Node.js 20+
- npm 10+
- Docker Desktop para el flujo containerizado

## Desarrollo local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia el entorno de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre `http://localhost:5173`.

## Variables de entorno

- `VITE_FORMS_ENDPOINT`: útil para desarrollo local con `npm run dev`.
- `FORMS_ENDPOINT`: útil en Docker o despliegues con `nginx`, porque se inyecta al iniciar el contenedor.
- `ADMIN_EMAIL`: correo autorizado para el panel privado.
- `ADMIN_PASSWORD`: contraseña segura del panel.
- `ADMIN_SESSION_SECRET`: cadena aleatoria larga utilizada para proteger la sesión.
- `COOKIE_SECURE`: usar `true` cuando el sitio público funcione mediante HTTPS.

Ejemplo:

```bash
cp .env.example .env
```

## Ejecución con Docker

```bash
docker compose up --build
```

La app quedará disponible en `http://localhost:8080`.

## Panel administrativo

El panel está disponible en `/administracion`. Permite actualizar el contenido de
las secciones existentes, subir imágenes y agregar enlaces o videos sin acceso al
código ni a la estructura visual. Los cambios se guardan en el volumen persistente
`fundecompe-content`; antes de cada publicación se conserva una copia de respaldo.

La opción **Bloques de página** funciona como un constructor seguro. Permite crear,
ordenar, ocultar o eliminar bloques de texto, texto con imagen, video, galería y
banner con botón, y decidir en cuál página se muestran. Los videos admiten enlaces
de YouTube/Vimeo o archivos MP4/WebM de hasta 30 MB.

Antes de iniciar Docker, copie `.env.example` como `.env` y reemplace las tres
credenciales administrativas de ejemplo. En producción, publique el sitio detrás
de HTTPS para proteger el acceso y la sesión, y configure `COOKIE_SECURE=true`.

## Flujo recomendado para formularios

1. Crear una hoja de Google con columnas:
   - `Fecha`
   - `Origen`
   - `Nombre`
   - `Email`
   - `Telefono`
   - `Asunto`
   - `Mensaje`
   - `Acepta politica`
   - `Estado`
2. Publicar un script de Google Apps Script como Web App.
3. Configurar la URL publicada en `FORMS_ENDPOINT`.

## Estructura

- `src/pages`: páginas principales del sitio.
- `src/components`: layout, navegación y bloques reutilizables.
- `src/data/siteContent.js`: contenido institucional editable.
- `docker/entrypoint.sh`: inyección de configuración runtime para el formulario.
- `nginx/default.conf`: configuración SPA para producción.

## Nota sobre redes sociales

Se conservaron los contactos principales verificados del sitio actual y se dejó la configuración de redes centralizada en `src/data/siteContent.js` para ajustar URLs exactas si Fundecompe entrega handles definitivos.
