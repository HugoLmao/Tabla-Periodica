const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const enrutador = require("./routes/routes");
const db = require("./models/index");

const app = express();

db.sequelize.sync();

//Para elminar las tablas o vaciar y aplicar nuevos cambios.
/*db.sequelize.sync({force:true}).then(()=>{
    conso*/

//middlewares

app.use(morgan("dev"));

app.use(express.json({limit:"50mb"}));

//routes
app.use('/api/clase', enrutador);
app.use('/public', express.static(__dirname + '/public' ));

//statics files

app.use(fileUpload);

//start server
app.listen(3000, ()=>{
    console.log('El servidor esta corriendo en el puerto 3000')
});
