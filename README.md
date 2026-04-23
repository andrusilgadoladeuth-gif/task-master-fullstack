# 🚀 TaskMaster Pro - Full Stack MERN App

¡Bienvenido a **TaskMaster Pro**! Esta es una aplicación robusta de gestión de tareas desarrollada con el stack MERN. El proyecto integra un servidor Node.js, una base de datos MongoDB y una interfaz dinámica en React para ofrecer una experiencia de usuario fluida y profesional.

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando las tecnologías más demandadas del mercado:

* **Frontend:** React.js (Vite), Bootstrap 5 para el diseño responsivo.
* **Backend:** Node.js y Express.js.
* **Base de Datos:** MongoDB (alojamiento local/Atlas) con Mongoose para el modelado.
* **Comunicación:** Axios para el consumo de la API REST.

---

## ✨ Características del Proyecto

* **Dashboard de Control:** Visualización en tiempo real del total de tareas, pendientes y completadas.
* **Gestión de Tiempos:** Registro automático de la fecha de creación y fecha de finalización de cada meta.
* **Interfaz Dinámica:** Etiquetas de estado que cambian de "Pendiente" a "Listo" instantáneamente.
* **Persistencia de Datos:** Todos los cambios se guardan de forma permanente en MongoDB.
* **UX/UI Limpia:** Diseño basado en tarjetas con sombras y efectos visuales de tachado para tareas terminadas.

---

## 🚀 Instalación y Uso Local

Para replicar este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el Repositorio
```bash
git clone [https://github.com/andrusilgadoladeuth-gif/task-master-fullstack.git](https://github.com/andrusilgadoladeuth-gif/task-master-fullstack.git)
cd task-master-fullstack

2. Configurar el Servidor (Backend)
```Bash
cd server
npm install
Crea un archivo .env en la carpeta server.

Agrega tu URI de conexión: MONGO_URI=mongodb://localhost:27017/taskdb

3. Configurar el Cliente (Frontend)
```Bash
cd ../client
npm install
4. Ejecución del Proyecto
Necesitarás abrir dos terminales en tu editor de código:

Terminal 1 (Backend): 
```bash
cd server
npm run dev

Terminal 2 (Frontend):  
```bash
cd client
npm run dev


👤 Autor
Andru Silgado Ladeuth

Desarrollador Full Stack en formación.
Apasionado por la arquitectura de software y el diseño de interfaces.
© 2026 - TaskMaster Pro Project


