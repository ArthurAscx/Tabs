const express = require('express');
const app = express();
app.use(express.static('public'));

app.set("view engine" , "ejs");

// NO PRESTAR ATENCION A ESTA LINEA app.set("views", __dirname +"/public/views");

// Rutas Principales

app.get('/', (req,res)=>{
    res.render('index');
});

// Rutas de Producto

app.get('/carrito', (req,res)=>{
    res.render('productCart');
});

app.get('/detalle', (req,res)=>{
    res.render('productDetail');
});
// Rutas de Usuario


app.get('/login', (req,res)=>{
    res.render('login');
});

app.get('/register', (req,res)=>{
    res.render('register');
});

// Puerto escucha en el Numero:

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});