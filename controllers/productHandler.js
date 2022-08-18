const path = require("path");

const productHandler = {
    detalle: (req,res)=>{
        res.sendFile(path.join(__dirname , '../views/productDetail.html'));
    },
    carrito: (req,res)=>{
        res.sendFile(path.join(__dirname , '../views/productCart.html'));
    }
}

module.exports = productHandler;
