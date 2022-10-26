const db = require("../Database/models")
const sequelize = require("sequelize");
let disc = {

    all: async function (req, res) {
        try {
            let allDiscs = await db.Disc.findAll()
            res.send(allDiscs.JSON())
        } catch (error) {
            res.send("Error en la consulta")
        }
    },
    disc: async (req, res) => {
        try {
            let discFound = await db.Disc.findByPk(req.params.id);
            discFound ? res.send(discFound): res.send("El disco no existe")
        } catch (error) {
            res.send("Error en la consulta")
        }
    }
};
module.exports = disc;