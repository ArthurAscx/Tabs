const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")

const productHandler = {
    detalle: (req,res)=>{
        res.render("productDetail");
    },
    carrito: (req,res)=>{
        res.render("productCart", {lista: lista});
    }
}


module.exports = productHandler;
