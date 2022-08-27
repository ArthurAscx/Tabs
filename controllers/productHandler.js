const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")

const productHandler = {
    detalle: (req,res)=>{
        let idDisco = parseInt(req.params.id);
        
        let disco = lista.find((disco)=> disco.id === idDisco)

        res.render("productDetail" , {disco : disco});
    },
    carrito: (req,res)=>{
        res.render("productCart", {lista: lista});
    }
}


module.exports = productHandler;
