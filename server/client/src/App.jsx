import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/');
      setTasks(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await api.post('/', { title });
    setTitle('');
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    await api.put(`/${id}`, { completed: !currentStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (window.confirm("¿Deseas eliminar esta tarea permanentemente?")) {
      await api.delete(`/${id}`);
      fetchTasks();
    }
  };

  // --- LÓGICA DEL DASHBOARD ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('es-ES', { 
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 0 auto' }}>
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">TaskMaster Pro</h1>
          <p className="text-muted">Gestión de objetivos y tiempos</p>
        </header>

        {/* DASHBOARD DE CONTADORES */}
        <div className="row mb-4 text-center">
          <div className="col-4">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h6 className="text-muted mb-1 text-uppercase small fw-bold">Total</h6>
                <h3 className="fw-bold text-dark mb-0">{totalTasks}</h3>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm border-0 bg-primary text-white">
              <div className="card-body">
                <h6 className="mb-1 text-white-50 text-uppercase small fw-bold">Pendientes</h6>
                <h3 className="fw-bold mb-0">{pendingTasks}</h3>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm border-0 bg-success text-white">
              <div className="card-body">
                <h6 className="mb-1 text-white-50 text-uppercase small fw-bold">Listas</h6>
                <h3 className="fw-bold mb-0">{completedTasks}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO DE ENTRADA */}
        <div className="card shadow-sm border-0 mb-4 p-3 bg-white">
          <form onSubmit={handleSubmit} className="d-flex gap-2">
            <input 
              type="text" className="form-control form-control-lg border-0 bg-light" 
              placeholder="Añadir nueva tarea..." 
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-primary px-4 fw-bold shadow-sm" type="submit">Añadir</button>
          </form>
        </div>

        {/* LISTA DE TAREAS DINÁMICA */}
        <div className="list-group border-0">
          {tasks.map(task => (
            <div key={task._id} className="list-group-item list-group-item-action border-0 mb-2 rounded shadow-sm d-flex justify-content-between align-items-center p-3 bg-white">
              <div>
                <h5 className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : 'fw-bold text-dark'}`}>
                  {task.title}
                </h5>
                <div className="small">
                  <span className="text-muted me-3">📅 Creada: {formatDate(task.createdAt)}</span>
                  
                  {!task.completed ? (
                    <span className="badge bg-warning text-dark px-2">Pendiente</span>
                  ) : (
                    <span className="text-success fw-bold">✅ Listo: {formatDate(task.completedAt)}</span>
                  )}
                </div>
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <button 
                  className={`btn btn-sm px-3 rounded-pill ${task.completed ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => toggleComplete(task._id, task.completed)}
                >
                  {task.completed ? 'Completada' : 'Marcar listo'}
                </button>
                <button 
                  className="btn btn-link text-danger p-0" 
                  onClick={() => deleteTask(task._id)}
                  title="Eliminar tarea"
                >
                  <span style={{ fontSize: '1.5rem', lineHeight: '0', display: 'block', fontStyle: 'normal' }}>&times;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center mt-5">
            <p className="text-muted fs-5">No hay tareas registradas. ¡Empieza añadiendo una!</p>
          </div>
        )}
      </div>

      {/* --- SECCIÓN DE CRÉDITOS (PIE DE PÁGINA) --- */}
      <footer className="text-center mt-5 pt-4 border-top" style={{ flexShrink: '0' }}>
        <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
          Desarrollado por
        </p>
        <h5 className="fw-bold text-dark mb-2">Andru Silgado Ladeuth</h5>
        <div className="d-flex justify-content-center gap-2 mb-3">
          <span className="badge rounded-pill bg-dark px-3">React</span>
          <span className="badge rounded-pill bg-dark px-3">Node.js</span>
          <span className="badge rounded-pill bg-dark px-3">MongoDB</span>
        </div>
        <p className="text-muted" style={{ fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} - Full Stack Developer Project
        </p>
      </footer>
    </div>
  );
}

export default App;