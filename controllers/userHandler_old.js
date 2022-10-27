const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/userList.json");
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator");


const userHandler = {


    login: (req, res) => {
        res.render("login");
    },



    logueado: (req, res) => {
        
        const errores = validationResult(req);
        
        if (!errores.isEmpty()) {
            return res.render("login",
                { mensajeDeError: errores.mapped(), old: req.body })
        };
        let usuariologeado = null;
        const usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        for (let user of usuarios) {
            if (user.Email === req.body.email && bcryptjs.compareSync(req.body.password, user.Password)) {
                    usuariologeado = user;
                    if(req.body.recordarUsuario === "true"){
                        res.cookie("recuerdame", user ,{ maxAge: 90000, httpOnly: true})
                    }
                    break
                }
            }
        if (!usuariologeado) {
            return res.render("login", {errors: [{ msg: "Credenciales invalidas" }]})
        }
            req.session.userlogeado = usuariologeado
            return res.redirect("/")
        
    },

    register: (req, res) => {
        res.render("register");
    },

    crear: (req, res) => {
        //validaciones//
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
   
            console.log(errores)
            return res.render("register", { mensajeDeError: errores.mapped(), old: req.body })
        };


        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        let hasheov1 = bcryptjs.hashSync(req.body.password, 10)
        let usr = {
            id: Date.now(),
            Nombreapellido: req.body.nombreApellido,
            Usuario: req.body.nombreDeUsuario,
            Nacimiento: req.body.fechaDeNacimiento,
            Email: req.body.correo,
            Password: hasheov1,
            Categoria: req.body.categoria,
            Imagen: "OIP.jpg"
        };
        if (req.file) {
            usr.Imagen = req.file.filename
        }
        usuarios.push(usr);
        usuarios = JSON.stringify(usuarios, null, " ");
        fs.writeFileSync(rutaArchivo, usuarios);
        res.redirect("/usuario/login")

    },


    lista: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        res.render("userList", { users: usuarios })
    },

    detalle: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        // Usar el find para encontrar el usuario y luego mandarlo a la página
        let userid = parseInt(req.params.id);
        let user = usuarios.find((u) => u.id === userid);
        if (user) {
            res.render("userDetail", { user })
        }
        else {
            console.log(userid);
            res.send(user)
        }
    },
    
    edicion: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        // Usar el find para encontrar el usuario y luego mandarlo a la página
        let userid = parseInt(req.params.id);
        let user = usuarios.find((u) => u.id === userid);
        if (user) {
            res.render("userEdit", { user })
        }
        else {
            console.log(userid);
            res.send(user)
        }
    },
    editar: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        let modificado = req.body;
        let newavatar = req.file;
        let hasheomodificado = bcryptjs.hashSync(modificado.Password, 10)
        // Usar el find para encontrar el usuario y modificarlo
        let userid = parseInt(req.params.id);
        let user = usuarios.find((u) => u.id === userid);
        if (user && modificado) {
            user.Nombreapellido = modificado.Nombreapellido
            user.Usuario = modificado.Usuario
            user.Nacimiento = modificado.Nacimiento
            user.Email = modificado.Email
            user.Password = hasheomodificado;
            user.Categoria = modificado.Categoria
            if (newavatar) {
                user.Imagen = req.file.filename
            }

        }
        usuarios = JSON.stringify(usuarios, null, " ");
        fs.writeFileSync(rutaArchivo, usuarios);

        res.redirect("/usuario/lista")
    },
    borrar: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        let userid = parseInt(req.params.id);
        let usuariossineliminado = usuarios.filter((u) => u.id !== userid);
        usuariossineliminado = JSON.stringify(usuariossineliminado, null, " ");
        fs.writeFileSync(rutaArchivo, usuariossineliminado);
        res.redirect("/usuario/lista")
    }
};

module.exports = userHandler;