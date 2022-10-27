const path = require("path");
const fs = require("fs");
const rutaProductos = path.join(__dirname, "/data/productList.json")
const handlerOne = {
    index: (req,res)=>{
        let user = req.session.user;
        const productos = JSON.parse(fs.readFileSync(rutaProductos), "utf-8");
        let masvendidos = productos.filter((p)=> p.ventas > 10);
        let nuevos = productos.filter((p)=> p.año > 2020);
        let nuestros = productos.filter((p)=> p.genero == "Electro")
        res.render("index", {masvendidos, nuevos, nuestros, user});
    },
    contacto: (req,res)=>{
        res.render("contacto");
    },
    ayuda: (req,res)=>{
        res.render("ayuda");
    },
    preguntas: (req,res) =>{
        res.render("preguntasFrecuentes");
    },
}

module.exports = handlerOne;