const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")
const db = require("../Database/models")
const axios = require('axios')

const productHandler = {
    detalle:async (req, res) => {
        try {
            let idDisco = parseInt(req.params.id);
            let disco = await axios.get("http://127.0.0.1:3000/api/discs/detail/"+idDisco)
            // UN TRY CATCH en caso de que este undefined el params id
            res.render("productDetail", { disco: disco.data.data });
        } catch (error) {
            res.send("Error en el llamado al procedimiento: "+ error)
        }
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

            if (p.id == req.params.id) {
                p.titulo = req.body.nombreDelProducto
                p.descripcion = req.body.descripcion
                p.genero = req.body.genero
                p.precio = Number(req.body.precio)
                p.año = req.body.ano
                p.categoría = req.body.categoria

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




    listado: async (req, res) => {
        try {
            let listica = await axios.get("http://127.0.0.1:3000/api/discs/all") 
            res.render("productList", { lista: listica.data.data })
        } catch (error) {
            res.send("Hubo un error al intentar crear la lista: "+error)
        }   
    },

    crearForm: (req, res) => {
        db.Disc.findAll()
            .then((disc) => {
                return res.render("productCreateForm", { disc: disc })
            })
    },
    crear: (req, res) => {
        db.disc.create()
        let producto = {
            title: req.body.title,
            idGenre: req.body.idGenre,
            idArtist: req.body.idArtist,
            artwork: "default-image.png",
            releaseYear: parseInt(req.body.releaseYear),
            price: Number(req.body.price),
            description: req.body.description,
            sales: 1
        }
        if (req.file) {
            producto.image = req.file.filename
        }
        lista.push(producto)

        const data = JSON.stringify(lista, null, " ");
        fs.writeFileSync(rutaArchivo, data);

        res.redirect("/producto/lista");
    },
    busqueda: (req, res) => {
        const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8");
        let searchword = req.query.find.toLowerCase()
        let arrayBuscados = lista.filter((disco) => disco.titulo.toLowerCase().includes(searchword))
        res.render("searchResults", { lista: arrayBuscados })
    }

}


module.exports = productHandler;
