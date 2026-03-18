/**
 * Configuración de la API para TicoAutos.
 * En desarrollo: deja estas URLs (localhost:3000).
 * En producción: cambia API_BASE y API_ORIGIN por la URL de tu backend
 * (ej: https://api.tudominio.com/api y https://api.tudominio.com).
 */
(function () {
  'use strict';
  var isLocal = /localhost|127\.0\.0\.1/i.test(window.location.hostname);
  window.APP_CONFIG = window.APP_CONFIG || {
    API_BASE: isLocal ? 'http://localhost:3000/api' : 'https://ticoautos-backend-api.onrender.com/api',
    API_ORIGIN: isLocal ? 'http://localhost:3000' : 'https://ticoautos-backend-api.onrender.com'
  };
})();
