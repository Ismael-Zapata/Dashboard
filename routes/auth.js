// routes/auth.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Leer datos de usuarios desde users.json
const usersPath = path.join(__dirname, '../users.json');
let users = JSON.parse(fs.readFileSync(usersPath));

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user; // Guardar el usuario en la sesión
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy(); // Destruir la sesión
  res.json({ success: true });
});

// Ruta para verificar si el usuario está autenticado
router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;