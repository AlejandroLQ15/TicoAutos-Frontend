// Envía un POST JSON al endpoint configurado en APP_CONFIG.API_BASE
// Retorna el cuerpo de la respuesta o lanza un error si algo falla.

//Función para registrar un nuevo usuario, recibe el nombre de usuario, contraseña y nombre completo.
export async function registrarUsuario(usuario, contrasena, nombre) {

  // Verifica si la app está corriendo en la computadora local (localhost) o en internet
  const isLocal = (typeof window !== 'undefined') && /localhost|127\.0\.0\.1/i.test(window.location.hostname);
  
  // Define la dirección del servidor según el entorno: local o producción
  const fallbackBase = isLocal ? 'http://localhost:3000/api' : 'https://ticoautos-backend-api.onrender.com/api';
  
  // Si existe una configuración personalizada en APP_CONFIG, la usa; si no, usa la dirección anterior
  const apiBase = (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.API_BASE)
    ? String(window.APP_CONFIG.API_BASE).replace(/\/$/, '')
    : fallbackBase;
  
    // Arma la URL completa a la que se enviarán los datos del nuevo usuario
    const url = `${apiBase}/users/register`;
  
  // Envía los datos del usuario al servidor mediante una solicitud POST en formato JSON
    try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario, password: contrasena, nombre }),
    });

    //Si la respuesta no es exitosa, intenta extraer el mensaje de error del cuerpo o usa el statusText
    if (!resp.ok) {
      const errData = await resp.json().catch(() => null);
      const msg = errData?.message || resp.statusText;
      
      // Lanza un error con el mensaje obtenido del servidor
      throw new Error(`Registro fallido: ${msg}`);
    }

    //Manejo de excepciones al intentr registrar un usuario, despliega error
    return await resp.json().catch(() => null);
  } catch (er) {
    
    // Si ocurre cualquier error inesperado, lo muestra en consola y lo lanza para quien use esta función
    console.error('Error registrarUsuario:', er);
    throw er;
  }
}