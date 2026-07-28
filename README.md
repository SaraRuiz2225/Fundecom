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

Ejemplo:

```bash
cp .env.example .env
```

## Ejecución con Docker

```bash
docker compose up --build
```

La app quedará disponible en `http://localhost:8080`.

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
