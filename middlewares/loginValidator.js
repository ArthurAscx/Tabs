const { body } = require("express-validator");
const db = require("../Database/models");

//validaciones
const validacionLogin =  [
    body("email").notEmpty().withMessage("Tienes que escribir un email actualmente registrado").bail()
    .isEmail().withMessage("Tiene que ser un formato de email").bail()
    .custom(async (val, {req}) =>  {
        let mailCompare = req.body.email
        let userExists = await db.User.findOne({
            where:{
                "email": mailCompare
            }
        })
        if (userExists){
             return true
        }
        else{
            throw new error("El mail no existe en la base de datos");
        } 
    }),

    
    body("password")
    .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
    .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres") ,
];
  
  module.exports = validacionLogin;
  