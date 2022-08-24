const path = require("path");
const lista = require("./productList")

const productHandler = {
    detalle: (req,res)=>{
        res.render("productDetail");
    },
    carrito: (req,res)=>{
        res.render("productCart", {lista: lista});
    }
}


module.exports = productHandler;
