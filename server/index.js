const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const taskRoutes = require('./routes/taskRoutes'); 

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
// Actualizamos CORS para que acepte peticiones desde el puerto de React (5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 2. Usar las rutas (Todas empezarán con /api/tasks)
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Servidor de Tareas Funcionando con MongoDB 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});