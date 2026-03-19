/**
 * Configuración de la API para TicoAutos.
 * En desarrollo: deja estas URLs (localhost:3000).
 * En producción: cambia API_BASE y API_ORIGIN por la URL de tu backend
 * (ej: https://api.tudominio.com/api y https://api.tudominio.com).
 */
<<<<<<< HEAD

// Se crea una función anónima que se ejecuta inmediatamente (IIFE),
// esto evita que las variables aquí definidas contaminen el resto del código
(function () {
  'use strict';

  // Verifica si la app está corriendo en la computadora local o en internet
  var isLocal = /localhost|127\.0\.0\.1/i.test(window.location.hostname);

  // Si APP_CONFIG aún no existe, lo crea con las URLs correspondientes al entorno
  window.APP_CONFIG = window.APP_CONFIG || {
    
    // URL base de la API: apunta al servidor local si estamos en desarrollo, o al servidor en internet si es producción
    API_BASE: isLocal ? 'http://localhost:3000/api' : 'https://ticoautos-backend-api.onrender.com/api',
    
    // Origen del servidor: similar al anterior, pero sin la ruta /api (se usa para validaciones de origen)
    API_ORIGIN: isLocal ? 'http://localhost:3000' : 'https://ticoautos-backend-api.onrender.com'
  };

})();
=======
(function () {
  'use strict';
  var isLocal = /localhost|127\.0\.0\.1/i.test(window.location.hostname);
  window.APP_CONFIG = window.APP_CONFIG || {
    API_BASE: isLocal ? 'http://localhost:3000/api' : 'https://ticoautos-backend-api.onrender.com/api',
    API_ORIGIN: isLocal ? 'http://localhost:3000' : 'https://ticoautos-backend-api.onrender.com'
  };
})();
>>>>>>> ad4bca3274bad669b452e0604563779629f1071e
