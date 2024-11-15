export async function GET(request) {
    try {
      // Realiza la petición utilizando fetch
      const response = await fetch('https://sensores-backend-94t6.onrender.com/', {
        method: 'GET',
      });
  
      // Verifica si la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }
  
      // Verifica el tipo de contenido
      const contentType = response.headers.get('Content-Type') || '';
  
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json(); // Parsear como JSON
      } else {
        data = await response.text(); // Leer como texto plano
      }
  
      console.log('Petición exitosa:', data);
  
      // Responde con los datos obtenidos
      return new Response(
        JSON.stringify({ message: 'Petición ejecutada', data }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error en la petición:', error.message);
  
      // Devuelve un error si algo falla
      return new Response(
        JSON.stringify({ message: 'Error en la petición', error: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  