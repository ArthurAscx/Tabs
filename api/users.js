const db = require("../Database/models")
const Op = db.Sequelize.Op
const bcryptjs = require("bcryptjs") 
let user = {

    all: async function (req, res) {
        try {
            let allUsers = await db.User.findAll();
            if(allUsers){ 
                let userFiltered = []
                for(let i = 0;i<allUsers.length;i++){
                    let userObj = {
                        firstName: allUsers[i].firstName, 
                        lastName: allUsers[i].lastName,
                        email: allUsers[i].email
                    }
                    userFiltered[i] = userObj
                }
                res.json({
                    total: allUsers.length,
                    data: userFiltered,
                    status: 200
                })
            }
             else{
                res.send("No se recibió informacion")
             }
        } catch (error) {
            res.send("Error en la consulta " + error)
        }
    },

    user: async (req, res) => {
        try {
            let userFound = await db.User.findByPk(req.params.id);
            if (userFound){
            userFound.password = null
            userFound.idCategory = null
            res.json({
                data: userFound,
                status: 200,
                detail: "http://localhost:3000/usuario/detalle/"+userFound.idUser
            })
        }
            else{
                res.send("El usuario no existe")
            }
        } catch (error) {
            res.send("Error en la consulta" + error)
        }
    },

    newUser: async (req, res) => {
        try {
        let userToCreate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate, 
            email: req.body.email, 
            password: bcryptjs.hashSync(req.body.password,10),
            avatar: req.body.avatar,
            idCategory:Number(req.body.idCategory)
        };
            let createdUser = await db.User.create(userToCreate);
            createdUser ? res.json({
                data: createdUser,
                status: 200
            })
                :
                // Aquí teoricamente no llega nunca porque el sequelize tiene unas validaciones de campos no nulos que hacen que caiga en el catch
                res.send("El usuario a crear esta vacio")
        } catch (error) {
            console.log(req.body);
            res.send("Error al momento de crear un usuario " + error)
        }
    },

    editUser: async (req, res) => {
        try {
            await db.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate, 
            email: req.body.email, 
            password: req.body.password,
            avatar: req.body.avatar,
            idCategory:Number(req.body.idCategory)
            },
                {
                    where: { idUser: req.params.id }
                })
            // REVISAR ESTO PARA PODER CARGAR LAS FOTOS Y AÑADIRLAS
            //if (req.file) {
            //     fs.unlinkSync("./public/img/user/" + p.image);
            //     p.image = req.file.filename;
            // }
            let userEdited = await db.User.findByPk(req.params.id);
            res.json({
                data: userEdited,
                status: 200
            })
        } catch (error) {
            res.send("There is an error: " + error)
        }
    },
    delete: async (req, res) => {
        try{
            await db.User.destroy({
                where: {
                    idUser: req.params.id
                }
            })
            res.redirect("/")
        } catch (error) {
            
        }
    },

    find: async (req,res)=>{
        try {
            let searchword = req.query.finder.toLowerCase()
            let userFound = await db.User.findAll({
                where: {
                    firstName:  {[Op.like]: "%"+ searchword +"%"}
                }
            })
            userFound ?
                res.json({
                    total: userFound.length,
                    data: userFound,
                    status: 200
                })
                :
                res.send("No se recibió informacion")
           // res.send("La búsqueda de "+ searchword+ " es: "+ userFound.title)
        } catch (error) {
            res.send("No se encontro el usuario. Razón: "+ error)
        }
    },

    findEmail: async (req,res) =>{
        let mailToFind = req.params.email
        try {
            let found = await db.User.findOne({
                where:{
                    "email": mailToFind
                }
            })
            found ?
            res.json({
                data: found,
                status: 200
            })
            :
            res.json({
                data: null,
                status: 404
            })
        } catch (error) {
            res.send("Error buscando mail en la base de datos: "+error)
        }
    }
}
module.exports = user;