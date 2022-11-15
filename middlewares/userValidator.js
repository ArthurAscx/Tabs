const { body } = require("express-validator");
const passUnencripted = body.password
//validaciones
const validacionRegister = [
    body("firstName").notEmpty().withMessage("Tienes que escribir un nombre").bail()
    .isLength({min: 2}).withMessage("Tiene que contener mas de dos caracteres"),

    body("lastName").notEmpty().withMessage("Tienes que escribir un apellido").bail()
    .isLength({min: 2}).withMessage("Tiene que contener mas de dos caracteres"),

    body("birthDate").notEmpty().withMessage("Tienes que escribir una fecha de nacimiento"), 

    body("email")
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .isEmail().withMessage("Tienes que escribir un correo válido"),

    body("idCategory").notEmpty().withMessage("Tienes que elegir una categoria"),
    body("password").notEmpty().withMessage("Tienes que escribir una constraseña").bail()
        .isLength({min: 8}).withMessage("La contraseña debe contener 8 caracteres"),
    body("avatar").custom(
           function(value, filename) {
                var extension = (path.extname(filename)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return '.jpg';
                    case '.jpeg':
                        return '.jpeg';
                    case  '.png':
                        return '.png';
                    case  '.gif':
                        return '.gif';
                    default:
                        return true;
                }
            }
    ).withMessage("La imagen contiene un formato invalido")
  ];
  
  module.exports = validacionRegister;
  