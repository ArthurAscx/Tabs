const { body } = require("express-validator");

//validaciones
const validacion = [
    body("nombreApellido").notEmpty().withMessage("Tenes que escribir un nombre"),
    body("nombreDeUsuario").notEmpty().withMessage("Tienes que escribir un nombre de usuario"),
    body("fechaDeNacimiento").notEmpty().withMessage("Tienes que escribir una fecha de nacimiento"), 
    body("avatar").notEmpty().withMessage("Tienes subier una imagen"), 
    body("correo")
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .isEmail().withMessage("Tienes que escribir un correo válido"),
    body("categoria").notEmpty().withMessage("Tienes que elegir una categoria"),
    body("password").notEmpty().withMessage("Tienes que elegir una constraseña"),
    body("password").notEmpty().withMessage("Tienes que elegir una constraseña"),
  ];
  
  module.exports = validacion;
  