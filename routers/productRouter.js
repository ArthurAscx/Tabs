const express = require("express");
const userData = require("../middlewares/sessionData");
const router = express.Router();
const multer = require("multer");
const rutasProducto = require("../controllers/productHandler");
const invitado = require("../middlewares/authGuests")
const logeado = require("../middlewares/authUsers")

const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, "public/img/productos");
    },
    filename:(req, file, cb)=> {
      console.log({ file });
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });

router.get("/find", rutasProducto.busqueda)
router.get("/detalle/:id", rutasProducto.detalle);
// router.get("/detalle", rutasProducto.detalleCatch) NECEISTAMOS UN CATCHH
router.get("/carrito",logeado, rutasProducto.carrito);

router.get("/edicion/:id",logeado, rutasProducto.creacionEdicion);
router.put("/edicion/:id", upload.single("imagenProducto"),rutasProducto.editar); 

router.get("/lista", rutasProducto.listado);

router.get("/crear", logeado, rutasProducto.crearForm)
router.post("/crear", upload.single("imagenProducto"),rutasProducto.crear)

router.delete("/borrar/:id", logeado, rutasProducto.borrar);



module.exports = router;

/* Luego chequear esto
router.get("/detalle/producto/:id", rutasProducto.detalle);
router.get("/carrito/:userid", rutasProducto.carrito);
*/
       