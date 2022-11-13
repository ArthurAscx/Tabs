const db = require("../Database/models")
const Op = db.Sequelize.Op
let category = {

    all: async function (req, res) {
        try {
            let allCategories = await db.Category.findAll();
            allCategories ?
                res.json({
                    total: allCategories.length,
                    data: allCategories,
                    status: 200
                })
                :
                res.send("No se recibió informacion")
        } catch (error) {
            res.send("Error en la consulta " + error)
        }
    }
}
module.exports = category;