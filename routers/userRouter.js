const express = require("express");
const router = express.Router();
const rutasUsuario= require("../controllers/userHandler");
const multer = require("multer");
const path = require("path");
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

router.get("/login", rutasUsuario.login);
router.get("/register", rutasUsuario.register);
router.post("/crear", upload.single("avatar"), rutasUsuario.crear)
router.get("/lista", rutasUsuario.lista)
router.get("/edicion/:id", rutasUsuario.edicion)

module.exports = router;

/* Luego chequear esto
router.get("/user/:id", rutasUsuario.perfil);
//router.get("/detalle", rutasUsuario.perfil);
router.get("/carrito/:userid", rutasProducto.carrito);
*/

