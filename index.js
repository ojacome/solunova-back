require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database')


const app = express();
const port = process.env.PORT || 3900;
const www = process.env.WWW || './public';



// Configurar CORS
app.use( cors() );

//logger en consola 
app.use( morgan('dev'));

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

//carpeta pública
app.use(express.static(www));


app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
