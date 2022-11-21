const { body } = require("express-validator");


const validacionEdit=  [
body("title").notEmpty().withMessage("Tienes que escribir un nombre").bail()
.isLength({min :5}).withMessage("El nombre debe de tener mas de 5 caracteres"),
body("description").isLength({min :20}).withMessage("La descripcion debe de tener mas de 20 caracteres"),

body("password")
.notEmpty().withMessage("Tienes que escribir una contraseña").bail()
.isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres"),

body("artwork").custom((val, {req}) =>{
    let img = req.file;
    let ext = path.extname(img.originalname)
    let extensiones = [".jpg",".png",".gif",".jpeg"];
    if(!img) {
    throw new Error("Hay que cargar una imagen")
    }
    else{
        if(!extensiones.includes(ext)){
        throw new Error("Las extensiones de imagen permitidas son .jpg .png .gif y .jpeg")
        }
    }
    return true
})
]

module.exports = validacionEdit;