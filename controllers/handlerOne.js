const path = require("path");
const fs = require("fs");
const rutaProductos = path.join(__dirname, "/data/productList.json")
const db = require("../Database/models")
const Op = db.Sequelize.Op
//const {DateTime} = require('luxon');
// the reason we love luxon is because it's easy to set the timezone   

const handlerOne = {
    index: async (req,res)=>{
        let user = req.session.user;

        let masvendidos = await db.Disc.findAll({
            where: {
                sales: {[Op.gte]: 20}
            }
        })
        let nuevos = await db.Disc.findAll({
            where: {
                 releaseYear: {[Op.gt]: 2000}
            }
        })
        let nuestros = await db.Disc.findAll({
            where: {
                idGenre: 5
            }
        })
        res.render("index", {masvendidos, nuevos, nuestros, user});
    },
    
    contacto: (req,res)=>{
        res.render("contacto");
    },
    ayuda: (req,res)=>{
        res.render("ayuda");
    },
    preguntas: (req,res) =>{
        res.render("preguntasFrecuentes");
    },
}

module.exports = handlerOne;