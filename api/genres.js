const db = require("../Database/models")
const Op = db.Sequelize.Op
let genre = {

    all: async function (req, res) {
        try {
            let allGenres = await db.Genre.findAll();
            allGenres ?
                res.json({
                    total: allGenres.length,
                    data: allGenres,
                    status: 200
                })
                :
                res.send("No se recibió informacion")
        } catch (error) {
            res.send("Error en la consulta " + error)
        }
    }
}
module.exports = genre;