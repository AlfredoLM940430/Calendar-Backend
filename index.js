const express = require('express');
require('dotenv').config();
const {dbConection} = require('./database/config');
const cors = require('cors');

//Crear seridor de express
const app = express();

//DB
dbConection()

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static('public'));

//Lectura de body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}` );
});