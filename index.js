const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload')
const enrutador = require('./routes/routes');
const db = require('./models/index');

const app = express();

db.sequelize.sync();

//Para eliminar o vaciar las tablas y aplicar nuevos cambios en estas

/*console.log('Tablas restablecidas')
db.sequelize.sync({force:true}).then(()=>{
});*/

app.use(morgan("dev"));
app.use(express.json({limit:'50mb'}));

app.use('/GOD/clase', enrutador);
app.use('/public', express.static(__dirname + '/public' ));

app.use(fileUpload);

app.listen(3000, ()=>{
    console.log('El servidor esta corriendo en el puerto 3000')
});