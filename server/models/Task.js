const mongoose = require('mongoose');

// Definición de la estructura de la tarea con soporte para Dashboard 
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // Este campo guardará el momento exacto en que marques la tarea como "Listo"
    completedAt: {
        type: Date,
        default: null
    }
}, { 
    // timestamps: true genera automáticamente 'createdAt' (fecha inicial)
    timestamps: true 
});

module.exports = mongoose.model('Task', TaskSchema);