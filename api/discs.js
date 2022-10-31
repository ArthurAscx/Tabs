const db = require("../Database/models")
const sequelize = require("sequelize");
let disc = {

    all: async function (req, res) {
        try {
            let allDiscs = await db.Disc.findAll();
            allDiscs ?
                res.json({
                    total: allDiscs.length,
                    data: allDiscs,
                    status: 200
                })
                :
                res.send("No se recibió informacion")

        } catch (error) {
            res.send("Error en la consulta " + error)
        }
    },

    disc: async (req, res) => {
        try {
            let discFound = await db.Disc.findByPk(req.params.id);
            discFound ? res.json({
                data: discFound,
                status: 200
            })
                :
                res.send("El disco no existe")
        } catch (error) {
            res.send("Error en la consulta")
        }
    },

    newDisc: async (req, res) => {
        try {
            let createdDisc = await db.Disc.create(req.body);
            createdDisc ? res.json({
                data: createdDisc,
                status: 200
            })
                :
                // Aquí teoricamente no llega nunca porque el sequelize tiene unas validaciones de campos no nulos que hacen que caiga en el catch
                res.send("El disco creado esta vacio")
        } catch (error) {
            console.log(req.body);
            res.send("Error al momento de crear un disco " + error)
        }
    },

    editDisc: async (req, res) => {
        try {
            await db.Disc.update({
                price: Number(req.body.price),
                title: req.body.title,
                artwork: req.body.artwork,
                sales: Number(req.body.sales),
                releaseYear: req.body.releaseYear,
                description: req.body.description,
                idArtist: Number(req.body.idArtist),
                idGenre: Number(req.body.idGenre)
            },
                {
                    where: { idDisc: req.params.id }
                })
            // REVISAR ESTO PARA PODER CARGAR LAS FOTOS Y AÑADIRLAS
            //if (req.file) {
            //     fs.unlinkSync("./public/img/productos/" + p.image);
            //     p.image = req.file.filename;
            // }
            let discEdited = await db.Disc.findByPk(req.params.id);
            res.json({
                data: discEdited,
                status: 200
            })
        } catch (error) {
            res.send("There is an error: " + error)
        }
    },
    delete: async (req, res) => {
        try{
            await db.Disc.destroy({
                where: {
                    idDisc: req.params.id
                }
            })
            res.redirect("/")
        } catch (error) {
            res.send("Hubo un error al eliminar la película. Error: " + error)
        }
    },

    find: async (req,res)=>{
        try {
            let searchword = req.query.finder.toLowerCase()
            let discsFound = await db.Disc.findAll({
                where: {
                    title: searchword
                }
            })
            discsFound ?
                res.json({
                    total: discsFound.length,
                    data: discsFound,
                    status: 200
                })
                :
                res.send("No se recibió informacion")
           // res.send("La búsqueda de "+ searchword+ " es: "+ discsFound.title)
        } catch (error) {
            res.send("No se encontro la pelicula. Razón: "+ error)
        }
    }
}
module.exports = disc;