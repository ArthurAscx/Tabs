const express = require("express");
const router = express.Router();
const rutasUsuario= require("../controllers/userHandler");
const multer = require("multer");
const path = require("path");
const validacionRegister = require("../middlewares/userValidator");
const validacionLogin = require("../middlewares/loginValidator");
const invitado = require("../middlewares/authGuests");
const logeado = require("../middlewares/authUsers")
const { body } = require("express-validator");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/Avatares'))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
      const idAvatar = Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + idAvatar + ext)
    }
  })
 const upload = multer({storage});




 // GETS de rutas
router.get("/login", invitado,  rutasUsuario.login);
router.get("/register",invitado, rutasUsuario.register);
router.get("/lista", rutasUsuario.lista)
router.get("/edicion/:id", logeado,  rutasUsuario.edicion)
router.get("/detalle/:id", logeado,  rutasUsuario.detalle)
//POST de rutas
router.post("/crear", upload.single("avatar"),validacionRegister, invitado , rutasUsuario.crear)

// PUT de rutas
router.put("/editar/:id", upload.single("Imagen"), logeado, rutasUsuario.editar)

// DELETE de rutas
router.delete("/borrar/:id", logeado,  rutasUsuario.borrar)

router.post("/login",validacionLogin, rutasUsuario.logueado);
/* router.get("/pruebaSession"), (req, res) =>{
  if(req.session.numeroVisitas == undefined){
    req.session.numeroVisitas = 0;
  }
    req.session.numeroVisitas++;
    res.send("sesion tiene el numero:" + req.session.numeroVisitas)
  }, */
 
  module.exports = router;


/* Luego chequear esto
router.get("/user/:id", rutasUsuario.perfil);
//router.get("/detalle", rutasUsuario.perfil);
router.get("/carrito/:userid", rutasProducto.carrito);
*/

