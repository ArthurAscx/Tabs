const db = require("../Database/models")
const sequelize = require("sequelize");
let disc = {

    all: async function (req, res) {
        try {
            let allDiscs = await db.Disc.findAll();
            allDiscs ?
            res.JSON({
                total: allDiscs.length,
                data: allDiscs,
                status: 200
            }) 
            :
            res.send("No se recibió informacion")

        } catch (error) {
            res.send("Error en la consulta")
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

    newDisc: async (req,res)=>{
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
    }
};
module.exports = disc;