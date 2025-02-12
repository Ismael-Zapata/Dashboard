// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'dashboard-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const dataRoutes = require('./routes/data');
const authRoutes = require('./routes/auth');

// Usar rutas
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);

// Ruta para el formulario de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Servir login.html
});

// Middleware para verificar sesión
app.use((req, res, next) => {
  if (!req.session.user && req.url !== '/login') {
    return res.redirect('/login'); // Redirigir al login si no hay sesión
  }
  next();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});