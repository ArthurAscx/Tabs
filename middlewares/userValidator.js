const { body } = require("express-validator");
const passUnencripted = body.password
const path = require("path");
const axios = require("axios")
//validaciones
const validacionRegister = [
    body("firstName").notEmpty().withMessage("Tienes que escribir un nombre").bail()
    .isLength({min: 2}).withMessage("Tiene que contener mas de dos caracteres"),

    body("lastName").notEmpty().withMessage("Tienes que escribir un apellido").bail()
    .isLength({min: 2}).withMessage("Tiene que contener mas de dos caracteres"),

    body("birthDate").notEmpty().withMessage("Tienes que escribir una fecha de nacimiento"), 

    body("email")
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .isEmail().withMessage("Tienes que escribir un correo válido").bail()
        .custom(async (val, {req}) =>  {
            let mailCompare = req.body.email
                let exists = await axios.get("http://127.0.0.1:3000/api/users/mailing/"+ mailCompare )
                if(exists.data.data == null){
                    return true
                }
                else{
                     throw new Error("El mail ya esta registrado")
                }
        }),

    body("idCategory").notEmpty().withMessage("Tienes que elegir una categoria"),
    body("password").notEmpty().withMessage("Tienes que escribir una constraseña").bail()
        .isLength({min: 8}).withMessage("La contraseña debe contener 8 caracteres").bail()
        .custom((val, {req})=>{
            let pwd = req.body.password;
            let regularExpression = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})$/
            if(!regularExpression.test(pwd)){
                throw new Error("El password no cumple con los requisitos de complejidad mayus,minus,numero,caracterEsp")
            }
            else{
                return true
            }
        }),
    
        body("avatar").custom((val, {req}) =>{
            let img = req.file; // VER URGENTE CAMBIAR A MIME TYPE
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
  ];
  
  module.exports = validacionRegister;
  