# API Backend Node.js

Backend simple con Express para consultar una API pública.

## Instalación

Las dependencias se instalan desde el package.json principal del proyecto:

```bash
npm install
```

## Ejecución

Desde la raíz del proyecto:

```bash
npm run start:api
```

O directamente desde esta carpeta:

```bash
cd src/api
npm install
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### GET /api/items
Obtiene todos los elementos desde la API pública (JSONPlaceholder - posts)

### GET /api/items/:id
Obtiene un elemento específico por ID

### GET /health
Health check del servidor

## Configuración

El servidor usa la API de JSONPlaceholder como ejemplo. Puedes cambiar la URL en `server.js`:

```javascript
const API_URL = "https://jsonplaceholder.typicode.com";
```

## CORS

El servidor está configurado para aceptar peticiones desde cualquier origen. En producción, deberías configurar CORS de manera más restrictiva.
