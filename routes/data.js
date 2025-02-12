// routes/data.js
const express = require('express');
const router = express.Router();

// Simulación de datos
const mockData = {
  users: Math.floor(Math.random() * 100),
  sales: Math.floor(Math.random() * 5000),
  activeConnections: Math.floor(Math.random() * 50),
  tasks: [
    { task: 'Tarea 1', category: 'Diseño', progress: 80, start: '2023-01-01', days: 10, end: '2023-01-10' },
    { task: 'Tarea 2', category: 'Desarrollo', progress: 60, start: '2023-01-05', days: 15, end: '2023-01-20' },
    { task: 'Tarea 3', category: 'Pruebas', progress: 40, start: '2023-01-10', days: 5, end: '2023-01-15' },
  ],
};

// Endpoint para obtener datos
router.get('/data', (req, res) => {
  res.json(mockData);
});

module.exports = router;