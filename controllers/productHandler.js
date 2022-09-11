const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")

const productHandler = {
    detalle: (req, res) => {
        let idDisco = parseInt(req.params.id);
        // UN TRY CATCH en caso de que este undefined el params id
        let disco = lista.find((disco) => disco.id === idDisco)

        res.render("productDetail", { disco: disco });
    },
    carrito: (req, res) => {
        res.render("productCart", { lista: lista });
    },

    creacionEdicion: (req, res) => {
        const lista = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        const listas = lista.find((p) => p.id == req.params.id)
          res.render("productEdit", { disco: listas });
        
    },
    editar: (req, res) => {
        const lista = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        const listas = lista.forEach((p) => {
            
            if(p.id == req.params.id){
                p.titulo=req.body.nombreDelProducto
                p.descripción=req.body.descripción
                p.genero=req.body.genero
                p.precio=req.body.precio

                if (req.file) {
                    fs.unlinkSync("./public/img/productos/" + p.image);
                    p.image = req.file.filename;
                }
                
            }
        
        })
        
        const data = JSON.stringify(lista, null, " ");
        fs.writeFileSync(rutaArchivo, data);
            res.redirect("/producto/lista")
    }, 

    borrar: (req, res) => {
        let lista = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        lista = lista.filter((p) => p.id != req.params.id);

        const data = JSON.stringify(lista, null, " ");
        fs.writeFileSync(rutaArchivo, data);

        res.redirect("/producto/lista");
    },




    listado: (req, res) => {
        res.render("productList", { lista: lista });
    },
    crearForm: (req, res) => {
        res.render("productCreateForm")
    },
    crear: (req, res) => {
        let producto = {
            id: Date.now(),
            titulo: req.body.nombreProducto,
            genero: req.body.genero,
            artista: req.body.artista,
            image: "default-image.png",
            año: parseInt(req.body.ano),
            precio: Number(req.body.precio),
            descripción: req.body.descripcion,
            ventas: 1
        }
        if (req.file) {
            producto.image = req.file.filename
        }
        lista.push(producto)

        const data = JSON.stringify(lista, null, " ");
        fs.writeFileSync(rutaArchivo, data);

        res.redirect("/producto/lista");
    },

}


module.exports = productHandler;
