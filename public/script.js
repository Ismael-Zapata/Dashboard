// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const updateDashboard = async () => {
      try {
        // Verificar si el usuario está autenticado antes de cargar los datos
        const authResponse = await fetch('/auth/check');
        const authData = await authResponse.json();
  
        if (!authData.isAuthenticated) {
          console.error('No se puede cargar el dashboard sin iniciar sesión.');
          return; // No continuar si no está autenticado
        }
  
        // Obtener datos del backend
        const response = await fetch('/api/data');
        const data = await response.json();
  
        // Actualizar tabla de tareas
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';
        data.tasks.forEach(task => {
          const row = `
            <tr>
              <td>${task.task}</td>
              <td>${task.category}</td>
              <td>${task.progress}%</td>
              <td>${task.start}</td>
              <td>${task.days}</td>
              <td>${task.end}</td>
            </tr>
          `;
          taskTableBody.innerHTML += row;
  
          // Mostrar notificación solo si el usuario está autenticado
          const endDate = new Date(task.end);
          const today = new Date();
          if (endDate - today < 3 * 24 * 60 * 60 * 1000) {
            alert(`La tarea "${task.task}" está próxima a vencer.`);
          }
        });
  
        // Crear gráfico "Curva S"
        const curveSData = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Presupuesto Acumulado',
              data: [10, 20, 30, 40, 50, 60],
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'Gasto Acumulado',
              data: [5, 15, 25, 35, 45, 55],
              borderColor: 'red',
              fill: false,
            },
          ],
        };
  
        const curveSConfig = {
          type: 'line',
          data: curveSData,
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Mes',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Porcentaje',
                },
              },
            },
          },
        };
  
        new Chart(document.getElementById('curveSChart'), curveSConfig);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    // Actualizar el dashboard al cargar la página
    updateDashboard();
  });