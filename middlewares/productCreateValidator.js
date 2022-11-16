const { body } = require("express-validator");

//validaciones
const validacionProducto =  [
    body("email").notEmpty().withMessage("Tienes que escribir un email actualmente registrado").bail()
    .isEmail().withMessage("Tiene que ser un formato de email").bail()
    .custom(async (val, {req}) =>  {
      let mailCompare = req.body.email
          let exists = await axios.get("http://127.0.0.1:3000/api/users/mailing/"+ mailCompare )
          if(exists.data.data != null){
              return true
          }
          else{
               throw new Error("El mail no esta registrado")
          }
    }),

    
    body("password")
    .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
    .isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres") ,
];
  
  module.exports = validacionLogin;
  