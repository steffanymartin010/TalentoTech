const express = require('express'); //Importo la libreria
const app = express(); //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
require('dotenv').config(); // Obtenemos las variables de entorno
const socket = require('socket.io'); // Importamos la libreria socket.io
const http = require('http').Server(app);
const io = socket(http);

const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL) // Creo la cadena de conexion

const userRoutes = require('./routes/UserRoutes');
const houseRoutes = require('./routes/HouseRoutes'); // Import

//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]
router.get('/', (req, res) => {
    //Informacion a modificar
    res.send("Hello world")
})

io.on('connect', (socket) => {
    console.log('connected')
    //Escuchando eventos desde el servidor
    socket.on('message', (data) => {
        console.log(data)
        //Emitimos eventos hacia el cliente
        socket.emit('message-receipt', {"Message": "Mensaje recibido en el servidor"})
    })
})

app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON
app.use((req, res, next) => {
    res.io = io
    next()
})

//Ejecuto el servidor
app.use(router)
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes)
app.use('/', houseRoutes)
http.listen(port, () => {
    console.log('Listen on ' + port)
})