const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/productList.json")
const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8")
const db = require("../Database/models")
//const Disc = require('../Database/models/Disc')
const axios = require("axios");

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




    listado: (req, res) => {
        db.Disc.findAll()
            .then((discos) => {
                res.render("productList", { Disc: discos })
            })
    },
    crearForm: (req, res) => {
        db.Disc.findAll()
            .then((disc) => {
                return res.render("productCreateForm", { disc: disc })
            })
    },
    crear: async (req, res) => {
        try {
            let producto = {
                title: req.body.title,
                idGenre: 1,//req.body.idGenre,
                idArtist: 1,//req.body.idArtist,
                artwork: "default-image.png",
                releaseYear: req.body.releaseYear,
                price: parseInt(req.body.price),
                description: req.body.description,
                sales: 1
            }

            await db.Disc.create({ ...producto });

            const discos = await db.Disc.findAll()

            res.render("productList", { Disc: discos })
        } catch (error) {
            console.log('error', error)
        }
    },
    busqueda: (req, res) => {
        const lista = JSON.parse(fs.readFileSync(rutaArchivo), "utf-8");
        let searchword = req.query.find.toLowerCase()
        let arrayBuscados = lista.filter((disco) => disco.titulo.toLowerCase().includes(searchword))
        res.render("searchResults", { lista: arrayBuscados })
    }

}


module.exports = productHandler;
