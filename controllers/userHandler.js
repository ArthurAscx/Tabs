const path = require("path");
const fs = require("fs");
const rutaArchivo = path.join(__dirname, "/data/userList.json")

const userHandler = {
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
    crear: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        let usr = {
            id: Date.now(),
            Nombreapellido: req.body.nombreApellido,
            Usuario: req.body.nombreDeUsuario,
            Nacimiento: req.body.fechaDeNacimiento,
            Email: req.body.correo,
            Contraseña: req.body.pass,
            Categoria: req.body.categoria,
            Imagen: "OIP.jpg"
        };
        if (req.file){
            usr.Imagen = req.file.filename
        }
        usuarios.push(usr);
        usuarios = JSON.stringify(usuarios, null, " ");
        fs.writeFileSync(rutaArchivo, usuarios);
        res.redirect("/usuario/login")
    },
    lista: (req,res)=>{
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        res.render("userList", {users: usuarios})
    },
    edicion: (req, res)=>{
        let usuarios = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
        // Usar el find para encontrar el usuario y luego mandarlo a la página
        let userid = parseInt(req.params.id);
        let user = usuarios.find((u)=> u.id === userid);
        if (user){
        res.render("userEdit", {user})
        }
        else{
            console.log(userid);
            res.send(user)
        }
    }
};

module.exports = userHandler;