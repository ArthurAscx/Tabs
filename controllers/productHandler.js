const path = require("path");
const fs = require("fs");
// const rutaArchivo = path.join(__dirname, "/data/productList.json")
// const db = require("../Database/models")
const axios = require('axios')

const productHandler = {
    detalle: async (req, res) => {
        try {
            let idDisco = parseInt(req.params.id);
            let disco = await axios.get("http://127.0.0.1:3000/api/discs/detail/" + idDisco)
            // UN TRY CATCH en caso de que este undefined el params id
            res.render("productDetail", { disco: disco.data.data });
        } catch (error) {
            res.send("Error en el llamado al procedimiento: " + error)
        }
    },

    carrito: async (req, res) => {
        try {
            let lista = await axios.get("http://127.0.0.1:3000/api/discs/all")
            res.render("productCart", { lista: lista.data.data });
        } catch (error) {
            res.send("Error en la consulta: " + error)
        }
    },

    creacionEdicion: async (req, res) => {
        try {
            let idDisco = req.params.id;
            let discToEdit = await axios.get("http://127.0.0.1:3000/api/discs/detail/" + idDisco)
            let idArtist = await axios.get("http://127.0.0.1:3000/api/artists/all")
            let idGenre = await axios.get("http://127.0.0.1:3000/api/genres/all")
            res.render("productEdit", { disco: discToEdit.data.data, idArtist: idArtist.data.data, idGenre: idGenre.data.data });
        } catch (error) {
            res.send("Error en el query: " + error)
        }
    },
    editar: async (req, res) => {
        let idDisco = req.params.id;
        let albumArtwork = null;
        if (req.file) {
            let discToEdit = await axios.get("http://127.0.0.1:3000/api/discs/detail/" + idDisco)
            discToEdit.data.data.artwork != "default-image.png" ? fs.unlinkSync("./public/img/productos/" + discToEdit.data.data.artwork) : "";
            albumArtwork = req.file.filename;
        }
        else{
            let discToEdit = await axios.get("http://127.0.0.1:3000/api/discs/detail/" + idDisco)
            albumArtwork = discToEdit.data.data.artwork
        }
        try {
            let filler = req.body
            await axios.put("http://127.0.0.1:3000/api/discs/edit/" + idDisco, {
                "price": Number(filler.price),
                "title": filler.title,
                "artwork": filler.artwork,
                "sales": filler.sales,
                "releaseYear": filler.releaseYear,
                "description": filler.description,
                "idArtist": filler.idArtist,
                "idGenre": filler.idGenre,
                "artwork": albumArtwork
            })
            res.redirect("/producto/lista")
        } catch (error) {
            res.send("Error al editar el disco: "+error)
        }
    },

    borrar:async (req, res) => {
        try {
            let idDisco = req.params.id
            //let discToDelete = await axios.get("http://127.0.0.1:3000/api/discs/detail/" + idDisco)
            //alert("Estas seguro de borrar  el disco: "+ discToDelete.data.data.title) Luego implementar esto 
            await axios.delete("http://127.0.0.1:3000/api/discs/kill/" + idDisco)
            res.redirect("/producto/lista");
        } catch (error) {
            res.send("Error al borrar el disco: "+error)
        }
    },

    listado: async (req, res) => {
        try {
            let listica = await axios.get("http://127.0.0.1:3000/api/discs/all")
            res.render("productList", { lista: listica.data.data })
        } catch (error) {
            res.send("Hubo un error al intentar crear la lista: " + error)
        }
    },

    crearForm: async(req, res) => {
        try {
            let tableGenre = await axios.get("http://127.0.0.1:3000/api/genres/all")
            let tableArtist = await axios.get("http://127.0.0.1:3000/api/artists/all")
            return res.render("productCreateForm", {idGenre: tableGenre.data.data, idArtist: tableArtist.data.data})
        } catch (error) {
            res.send("Error en al traer un elemento de opción del formulario: "+error)
        }
    },

    crear: async (req, res) => {
        let albumArtwork = null;
        req.file ? albumArtwork = req.file.filename : albumArtwork = albumArtwork = "default-image.png";
        try {
            let filler = req.body;
            await axios.post("http://127.0.0.1:3000/api/discs/create", {
                "price": Number(filler.price),
                "title": filler.title,
                "artwork": albumArtwork ? albumArtwork : "default-image.png",
                "sales": filler.sales,
                "releaseYear": filler.releaseYear,
                "description": filler.description,
                "idArtist": filler.idArtist,
                "idGenre": filler.idGenre
            })
            res.redirect("/producto/lista");
        } catch (error) {
            res.send("Error en el query de creacion: "+error)
        }
    },
    
    busqueda:async (req, res) => {
        try {
            let arrayBuscados = await axios.get("http://127.0.0.1:3000/api/discs/find?finder="+req.query.finder)
            res.render("searchResults", { lista: arrayBuscados.data.data })
        } catch (error) {
            res.send("Error en los parámetros de la búsqueda: "+error)
        }
    }
}


module.exports = productHandler;
