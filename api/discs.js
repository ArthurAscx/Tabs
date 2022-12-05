const db = require("../Database/models")
const Op = db.Sequelize.Op
let disc = {

    all: async function (req, res) {
        let DiscGenres = {
            genre1 : 0,
            genre2 : 0,
            genre3 : 0,
            genre4 : 0,
            genre5 : 0,
            genre6 : 0,
            genre7 : 0,
            genre8 : 0,
        }
        try {
            let allDiscs = await db.Disc.findAll();
            allDiscs.forEach(disc => {
                switch(disc.idGenre) {
                    case(1): DiscGenres.genre1 += 1
                    break;
                    case(2): DiscGenres.genre2 += 1
                    break;
                    case(3): DiscGenres.genre3 += 1
                    break;
                    case(4): DiscGenres.genre4 += 1
                    break;
                    case(5): DiscGenres.genre5 += 1
                    break;
                    case(6): DiscGenres.genre6 += 1
                    break;
                    case(7): DiscGenres.genre7 += 1
                    break;
                    case(8): DiscGenres.genre8 += 1
                    break;
                }
            });
            allDiscs ?
                res.json({
                    total: allDiscs.length,
                    genres: DiscGenres,
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
                img: "http://localhost:3000/img/productos/" + discFound.artwork,
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
        try {
            await db.Disc.destroy({
                where: {
                    idDisc: req.params.id
                }
            })
            res.json({
                data: null,
                status: 200
            })
        } catch (error) {
            res.send("Hubo un error al eliminar la película. Error: " + error)
        }
    },

    find: async (req, res) => {
        try {
            let searchword = req.query.finder.toLowerCase()
            let discsFound = await db.Disc.findAll({
                where: {
                    title: { [Op.like]: "%" + searchword + "%" }
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
            res.send("No se encontro el disco. Razón: " + error)
        }
    }
}
module.exports = disc;