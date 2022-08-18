const express = require('express');
const app = express();
app.use(express.static('public'));

// Rutas Principales

app.use("/", rutasPrincipales);

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

// Rutas de Producto

app.use("/detalle" , rutasProducto);
app.use("/carrito" , rutasProducto);

app.get("/detalle" , (req,res) =>{
    res.sendFile(__dirname + '/views/productDetail.html'); 
})

app.get("/carrito" , (req,res) =>{
    res.sendFile(__dirname + '/views/productCart.html'); 
})

// Rutas de Usuario

app.use("/login" , rutasUsuario);
app.use("/register" , rutasUsuario);

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});

// Puerto escucha en el Numero:

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});