const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/userList.json");
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator");
const db = require("../Database/models");
const axios = require('axios')


const userHandler = {


    login: (req, res) => {
        res.render("login");
    },



    logueado: async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.render("login",
                { mensajeDeError: errores.mapped(), old: req.body })
        };
        try {
            let usuariologeado = null;
            let userToLogin = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (userToLogin) {
                if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
                    usuariologeado = userToLogin;
                    if (req.body.recordarUsuario === "true") {
                        res.cookie("recuerdame", usuariologeado, { maxAge: 90000, httpOnly: true })
                    }
                }
            }
            if (!usuariologeado) {
                return res.render("login", { errors: [{ msg: "Credenciales invalidas" }] })
            }
            req.session.userlogeado = usuariologeado
            return res.redirect("/")
        } catch (error) {
            res.send("Hubo un error en la ejecucion del query: " + error)
        }
    },

    register: async (req, res) => {
        try {
            let tableCategory = await axios.get("http://127.0.0.1:3000/api/categories/all")
            res.render("register", {idCategory: tableCategory.data.data});
        } catch (error) {
            res.send("Error en al traer un elemento de opción del formulario: "+error)
        }
    },

    crear: async (req, res) => {
         const errores = validationResult(req);
         if (!errores.isEmpty()) {
            try {
                let tableCategory = await axios.get("http://127.0.0.1:3000/api/categories/all")
                return res.render("register", { mensajeDeError: errores.mapped(), old: req.body, idCategory: tableCategory.data.data })
            } catch (error) {
                res.send("Error en al traer un elemento de opción del formulario: "+error)
            }
         };
        try {
            let userAvatar = null;
            req.file ? userAvatar = req.file.filename : userAvatar = "default-avatar.png";
            let hasheov1 = bcryptjs.hashSync(req.body.password, 10);
            let usr = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                email: req.body.email,
                avatar: userAvatar,
                password: hasheov1,
                idCategory: Number(req.body.idCategory)
            };
            await db.User.create(usr);
            res.redirect("/usuario/login")
        } catch (error) {
            res.send("Error al momento de crear un usuario " + error)
        }
    },


    lista:async (req, res) => {
        try {
            let listaUser = await db.User.findAll();
            res.render("userList", { users: listaUser})
        } catch (error) {
            res.send("Hubo un error al intentar crear la lista de usuarios: " + error)
        }
    },

    detalle:async (req, res) => {
        try {
            let idUser = Number(req.params.id);
            let user = await db.User.findByPk(idUser);
            console.log(user);
            res.render("userDetail", { user: user });
        } catch (error) {
            res.send("Error intentando traer el usuario a la vista: " + error)
        }
        // Usar el find para encontrar el usuario y luego mandarlo a la página
    },

    edicion:async (req, res) => {
        // Usar el find para encontrar el usuario y luego mandarlo a la página
        try {
            let userId = parseInt(req.params.id);
            let user = await db.User.findByPk(userId)
            let idCategory = await axios.get("http://127.0.0.1:3000/api/categories/all")
            res.render("userEdit", { user, idCategory: idCategory.data.data })
        } catch (error) {
            res.send("Error al traer los datos para la edición: " + error)
        }
    },

    editar:async (req, res) => {
        let newAvatar = null;
        let hasheomodificado = bcryptjs.hashSync(req.body.password, 10)
        req.file ? newAvatar = req.file.filename : newAvatar = "default-avatar.png";
        try {
            await db.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate, 
            email: req.body.email, 
            password: hasheomodificado,
            avatar: newAvatar,
            idCategory:Number(req.body.idCategory)
            },
            {
                where: {idUser: req.params.id}
            }) 
            res.redirect("/usuario/lista")
            }
            catch (error) {
            res.send("Error al editar el usuario: "+error)
        }
        // Usar el find para encontrar el usuario y modificarlo
    },
    borrar: async(req, res) => {
        try {
            await db.User.destroy({
                where: {
                    idUser: req.params.id
                }
            })
            res.redirect("/")
        } catch (error) {
            res.send("Hubo un error al eliminar el usuario. Error: " + error)
        }
    }
};

module.exports = userHandler;