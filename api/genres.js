const db = require("../Database/models")
const Op = db.Sequelize.Op
let genre = {

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
            let allGenres = await db.Genre.findAll();
            allGenres ?
                res.json({
                    total: allGenres.length,
                    totalByGenre: DiscGenres,
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