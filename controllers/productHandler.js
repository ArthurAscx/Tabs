const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")

const productHandler = {
    detalle: (req,res)=>{
        let idDisco = parseInt(req.params.id);
        // UN TRY CATCH en caso de que este undefined el params id
        let disco = lista.find((disco)=> disco.id === idDisco)

        res.render("productDetail" , {disco : disco});
    },
    carrito: (req,res)=>{
        res.render("productCart", {lista: lista});
    },

    creacionEdicion: (req,res) =>{
        res.render("productEdit")
    },
    listado: (req,res)=>{
        res.render("productList", {lista: lista});
    },
    crearForm: (req,res)=>{
        res.render("productCreateForm")
    },
    crear: (req,res)=>{
        let producto= {
            id: Date.now(),
            nombre: req.body.nombreProducto,
            genero: req.body.genero,
            artista: req.body.artista,
            imagen: "default-image.png",
            año: req.body.ano,
            precio: req.body.precio,
            descripción: req.body.descripcion,
        }  
       lista.push(producto)

       const data = JSON.stringify(lista, null, " ");
    fs.writeFileSync(rutaArchivo, data);

        res.redirect("/producto/lista");
    },

}


module.exports = productHandler;
