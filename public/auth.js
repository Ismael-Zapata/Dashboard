// public/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
  
    // Verificar si el usuario está autenticado
    fetch('/auth/check')
      .then(response => response.json())
      .then(data => {
        if (!data.isAuthenticated) {
          window.location.href = '/login'; // Redirigir al formulario de login si no está autenticado
        }
      })
      .catch(error => {
        console.error('Error al verificar la autenticación:', error);
        window.location.href = '/login'; // En caso de error, redirigir al login
      });
  
    // Cerrar sesión
    logoutBtn.addEventListener('click', () => {
      fetch('/auth/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Sesión cerrada exitosamente.');
            window.location.href = '/login'; // Redirigir al formulario de login después de cerrar sesión
          } else {
            alert('Error al cerrar sesión.');
          }
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error);
          alert('Ocurrió un error al cerrar sesión.');
        });
    });
  });