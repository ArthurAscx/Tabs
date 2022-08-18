// Express instanciado y rutas estaticas
const express = require('express');
const app = express();
app.use(express.static('public'));

// Routers
const rutasPrincipales = require("./routers/mainRouter");
const rutasProducto = require("./routers/productRouter");
const rutasUsuario = require("./routers/userRouter");

// Rutas Principales

app.use("/", rutasPrincipales);

// Rutas de Producto

app.use("/detalle" , rutasProducto);
app.use("/carrito" , rutasProducto);


// Rutas de Usuario

app.use("/login" , rutasUsuario);
app.use("/register" , rutasUsuario);

// Puerto escucha en el Numero:

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});