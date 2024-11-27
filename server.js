require("dotenv").config();
const express = require("express");
const http = require("http");
const { sequelize } = require("./db_connection");
const router = require("./routes/index");
const { PORT_MODULO_ASISTENCIA } = process.env;

//const { initializeSocket, userSockets } = require("./sockets");
//const loginMiddleware = require("./checkers/validateToken");
//const usuariosRouter = require("./routes/loginRouter");
const cors = require("cors");
//const path = require('path'); //traer path
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
//const multer = require('multer');
//app.use("/login", usuariosRouter); // no aplica authMiddleware para el manejo de usuarios
//app.use(loginMiddleware); // usa el middleware globalmente para validar todas las rutas a las que se va a acceder en el sistema solo estando logeado
const server = http.createServer(app); // servidor http a partir de express

//initializeSocket(server); // Inicializamos Socket.io

//app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "El servidor esta funcionando!", data: "Bien perro!" });
});

//app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //para leerlo defrente y el front tenga acceso a esos archivos

server.listen(PORT_MODULO_ASISTENCIA, () => {
  console.log(`MODULO_ASISTENCIA Server is running on port ${PORT_MODULO_ASISTENCIA}`);
  sequelize.sync({alter: true }) // cambiar de alter a force para que se borren las tablas y se creen de nuevo, hasta que queden bien diseñadas
    .then(() => console.log("Database is connected"))
    .catch(err => console.error("Error connecting to the database:", err));
});

//module.exports = { userSockets };

// expressurl encode