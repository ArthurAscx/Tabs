const path = require("path");

const productHandler = {
    detalle: (req,res)=>{
        res.render("productDetail");
    },
    carrito: (req,res)=>{
        res.render("productCart");
    }
}


module.exports = productHandler;
