const db = require("../Database/models")
const Op = db.Sequelize.Op
let artist = {

    all: async function (req, res) {
        try {
            let allArtists = await db.artist.findAll();
            allArtists ?
                res.json({
                    total: allArtists.length,
                    data: allArtists,
                    status: 200
                })
                :
                res.send("No se recibió informacion")
        } catch (error) {
            res.send("Error en la consulta " + error)
        }
    }
}
module.exports = artist;