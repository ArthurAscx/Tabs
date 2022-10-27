const { body } = require("express-validator");
const passUnencripted = body.password
//validaciones
const validacionRegister = [
    body("nombreApellido").notEmpty().withMessage("Tenes que escribir un nombre"),
    body("nombreDeUsuario").notEmpty().withMessage("Tienes que escribir un nombre de usuario"),
    body("fechaDeNacimiento").notEmpty().withMessage("Tienes que escribir una fecha de nacimiento"), 
    body("correo")
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .isEmail().withMessage("Tienes que escribir un correo válido"),
    body("categoria").notEmpty().withMessage("Tienes que elegir una categoria"),
    body("password").notEmpty().withMessage("Tienes que escribir una constraseña").bail()
        .isLength({min: 8}).withMessage("La contraseña debe contener 8 caracteres"),
  ];
  
  module.exports = validacionRegister;
  