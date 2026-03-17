# Despliegue de TicoAutos con dominio personalizado (gratuito y seguro)

Esta guía te permite poner el sitio en línea con un **dominio propio** usando opciones **gratuitas** y con **HTTPS**.

---

## 1. Resumen de la arquitectura

- **Frontend** (HTML, CSS, JS): se despliega en un host estático (Netlify, Vercel o Cloudflare Pages).
- **Backend** (Node.js + Express + MongoDB): se despliega en Render, Railway o similar.
- **Dominio**: lo compras en un registrador (o usas un subdominio gratuito que ofrezca el host).
- **HTTPS**: lo proporcionan los mismos servicios de forma gratuita.

---

## 2. Opción recomendada (todo gratuito)

### Frontend → Netlify o Cloudflare Pages

| Servicio           | Ventaja                         | Dominio propio |
|--------------------|----------------------------------|----------------|
| **Netlify**        | Muy fácil, HTTPS automático      | Sí (tu dominio o `*.netlify.app`) |
| **Cloudflare Pages** | Rápido, buena seguridad       | Sí (tu dominio o `*.pages.dev`)   |
| **Vercel**         | Muy usado con JS/React          | Sí (tu dominio o `*.vercel.app`)  |

### Backend → Render

- Plan **free**: 1 servicio web gratuito.
- Te dan una URL tipo `https://ticoautos-api.onrender.com`.
- Duerme tras ~15 min sin uso; la primera petición puede tardar unos segundos.

### Base de datos → MongoDB Atlas

- Cuenta gratuita en [mongodb.com/atlas](https://www.mongodb.com/atlas).
- Crea un cluster gratuito y obtén la URI de conexión (ej: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/ticoautos`).

---

## 3. Pasos para desplegar

### A. Desplegar el backend en Render

1. Entra en [render.com](https://render.com) y regístrate (con GitHub si quieres).
2. **New → Web Service**.
3. Conecta el repositorio donde está **TicoAutos-Backend-main** (o sube el código).
4. Configuración sugerida:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Plan:** Free
5. En **Environment** agrega:
   - `MONGO_URI` = tu URI de MongoDB Atlas
   - `JWT_SECRET` = una clave larga y aleatoria (guárdala)
   - `ALLOWED_ORIGINS` = `https://tudominio.com,https://www.tudominio.com` (o la URL que te dé Netlify/Cloudflare hasta tener dominio)
6. Deploy. Anota la URL del servicio, ej: `https://ticoautos-api.onrender.com`.

### B. Configurar el frontend para usar tu API

En el frontend (carpeta **TicoAutos-Frontend-main**), edita **`js/config.js`**:

- Si **aún no tienes dominio**: sustituye `api.tudominio.com` por la URL de Render (sin `/api` al final), por ejemplo:
  - `API_ORIGIN`: `https://ticoautos-api.onrender.com`
  - `API_BASE`: `https://ticoautos-api.onrender.com/api`
- Cuando tengas dominio propio para la API (ej. `api.tudominio.com`), pon aquí esa URL.

El archivo ya detecta `localhost` y en local sigue usando `http://localhost:3000` sin tocar nada más.

### C. Desplegar el frontend en Netlify

1. Entra en [netlify.com](https://www.netlify.com) y regístrate.
2. **Add new site → Deploy manually** (o conecta tu repo con la carpeta del frontend).
3. Arrastra la carpeta **TicoAutos-Frontend-main** (o la que contenga `index.html`, `js/`, `css/`, `pages/`) a la zona de deploy.
4. Netlify te dará una URL tipo `https://nombre-aleatorio.netlify.app`. Pruébala: debe cargar el sitio y las llamadas deben ir a la API de Render (según `config.js`).
5. En el backend (Render), en **Environment**, pon en `ALLOWED_ORIGINS` esa URL de Netlify, por ejemplo:  
   `https://nombre-aleatorio.netlify.app`  
   (y más adelante añades tu dominio con y sin `www`).

### D. Dominio personalizado (opcional)

#### Si ya tienes un dominio (ej. comprado en Namecheap, GoDaddy, etc.)

1. En **Netlify**: Site settings → Domain management → Add custom domain → escribe tu dominio.
2. Netlify te indicará qué registros DNS crear. Normalmente:
   - **CNAME** para `www`: apuntar a `nombre-del-sitio.netlify.app`.
   - Para el **apex** (ej. `ticoautos.com`), Netlify suele dar IPs o usar su **Netlify DNS** (si delegas los nameservers).
3. Espera a que propague el DNS (desde unos minutos hasta 24–48 h). Netlify activa **HTTPS** automáticamente (Let’s Encrypt).
4. En el backend (Render), en **Environment**, actualiza:
   - `ALLOWED_ORIGINS=https://ticoautos.com,https://www.ticoautos.com`
5. En **`js/config.js`** del frontend, deja (o actualiza) `API_BASE` y `API_ORIGIN` con la URL de tu API (Render o, si la tienes, `https://api.tudominio.com`), vuelve a desplegar el frontend en Netlify.

#### Subdominio para la API (ej. `api.tudominio.com`)

- En **Render**: en tu Web Service, Domain → Add custom domain → `api.tudominio.com`.
- En tu registrador de dominio, crea un **CNAME** `api` apuntando a la URL que te indique Render (ej. `ticoautos-api.onrender.com`).
- Cuando esté activo, en **`js/config.js`** usa:
  - `API_ORIGIN`: `https://api.tudominio.com`
  - `API_BASE`: `https://api.tudominio.com/api`
- En **ALLOWED_ORIGINS** del backend incluye `https://tudominio.com` y `https://www.tudominio.com`.

---

## 4. Seguridad rápida

- **HTTPS**: Usa siempre URLs `https://` en producción (Netlify y Render lo dan gratis).
- **Variables sensibles**: `JWT_SECRET`, `MONGO_URI` y `ALLOWED_ORIGINS` solo en variables de entorno del backend (nunca en el código ni en el frontend).
- **CORS**: El backend ya usa `ALLOWED_ORIGINS`; mantén ahí solo los orígenes de tu frontend (dominio y/o URL de Netlify/Cloudflare).

---

## 5. Resumen de archivos que tocaste

- **Frontend:** `js/config.js` — aquí se define la URL de la API (desarrollo y producción).
- **Backend:** `.env` (o variables en Render): `MONGO_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS`.

Con esto puedes correr TicoAutos en producción con dominio personalizado de forma gratuita y segura. Si más adelante cambias de host (por ejemplo frontend a Vercel o Cloudflare Pages), solo actualizas `config.js` y `ALLOWED_ORIGINS` según las nuevas URLs.
