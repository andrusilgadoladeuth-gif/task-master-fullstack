const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Importamos el modelo que creamos antes

// 1. OBTENER TODAS LAS TAREAS (GET)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // Trae las más recientes primero
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CREAR UNA NUEVA TAREA (POST)
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// 3. ACTUALIZAR UNA TAREA (PUT) - Para marcar como completada
router.put('/:id', async (req, res) => {
    try {
        const { completed } = req.body;
        const updateData = { 
            completed,
            completedAt: completed ? new Date() : null // Si se completa, guarda la fecha, si no, nulo.
        };
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// 4. ELIMINAR UNA TAREA (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;