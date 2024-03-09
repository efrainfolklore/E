// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

// Inicializar la aplicación Express
const app = express();
const port = 3000;

// Configurar el análisis de solicitudes JSON
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB (asegúrate de tener MongoDB instalado y en ejecución)
mongoose.connect('mongodb://localhost:27017/rwylm',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Definir un modelo de ejemplo
const Usuario = mongoose.model('Usuario', { nombre: String, email: String });

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'Proyecto')));

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
