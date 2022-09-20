const { body } = require("express-validator");

//validaciones
const validacion = [
    body("nombreApellido").notEmpty().withMessage("Tenes que escribir un nombre"),
    body("nombreDeUsuario").notEmpty().withMessage("Tienes que escribir un nombre de usuario")
    
  ];
  
  module.exports = validacion;
  