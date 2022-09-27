const { body } = require("express-validator");

//validaciones
const validacion1 =  [
    body("nombreDeUsuario").notEmpty().withMessage("Tenes que escribir un nombre"),
    body("password")
    .notEmpty().withMessage("Tienes que elegir una constraseña").bail()
    .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres") ,
];
  
  module.exports = validacion1;
  