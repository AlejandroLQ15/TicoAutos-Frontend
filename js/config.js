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
    API_BASE:   isLocal ? 'http://localhost:3000/api' : 'https://ticoautos-backend.onrender.com/api',
    API_ORIGIN: isLocal ? 'http://localhost:3000'     : 'https://ticoautos-backend.onrender.com',

    // Endpoints de autenticación extendida
    ACTIVATE_URL:     '/users/activate',          // GET ?token=...
    RESEND_ACTIVATION_URL: '/users/resend-activation', // POST { email }
    ACTIVATION_RESEND_COOLDOWN_SECONDS: 60,
    VERIFY_2FA_URL:   '/users/verify-2fa',        // POST { pendingLoginToken, code }
    RESEND_2FA_URL:   '/users/resend-2fa',        // POST { pendingLoginToken }
    TOGGLE_2FA_URL:   '/users/me/2fa',            // PATCH (protected) { enable, phone }
  };
})();
