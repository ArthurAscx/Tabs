// Express instanciado y rutas estaticas
const express = require('express');
const app = express();
const methodOverride = require("method-override")
app.use(express.static('public'));

app.set("view engine" , "ejs");

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"))
// NO PRESTAR ATENCION A ESTA LINEA app.set("views", __dirname +"/public/views");

// Routers importados
const rutasPrincipales = require("./routers/mainRouter");
const rutasProducto = require("./routers/productRouter");
const rutasUsuario = require("./routers/userRouter");


// Rutas Principales

app.use("/", rutasPrincipales);

// Rutas de Producto

app.use("/producto" , rutasProducto);

// Rutas de Usuario

app.use("/usuario" , rutasUsuario);

// Puerto escucha en el Numero:




app.listen(3000, ()=>{
    console.log('Servidor funcionando puerto 3000');
});