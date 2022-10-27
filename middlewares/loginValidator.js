const { body } = require("express-validator");

//validaciones
const validacionLogin =  [
    body("email").notEmpty().withMessage("Tienes que escribir un email actualmente registrado"),
    body("password")
    .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
    .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres") ,
];
  
  module.exports = validacionLogin;
  