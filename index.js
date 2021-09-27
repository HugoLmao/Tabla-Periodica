const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const db = require('./models/index');

const app = express();

db.sequelize.sync();

//Para eliminar o vaciar las tablas y aplicar nuevos cambios en estas

/*db.sequelize.sync({force:true}).then(()=>{
    console.log('Tablas restablecidas')
});*/

app.use(morgan('dev'));

app.use(express.json({limit:'50mb'}));

app.use('/api/clase', router)

app.listen(8080, ()=>{
    console.log('El servidor esta corriendo en el puerto 8080')
});
//Terminar los controladores y rutas.