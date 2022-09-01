const express = require("express");

const router = express.Router();
const multer = require("multer");
const rutasProducto = require("../controllers/productHandler");



const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, "public/img/productos");
    },
    filename:(req, file, cb)=> {
      console.log({ file });
      cb(null, Date.now() + "" + file.originalname);
    },
  });

  const upload = multer({ storage });


router.get("/detalle/:id", rutasProducto.detalle);
// router.get("/detalle", rutasProducto.detalleCatch) NECEISTAMOS UN CATCHH
router.get("/carrito", rutasProducto.carrito);

router.get("/edicion", rutasProducto.creacionEdicion);
/* router.post("/creacionEdicion", rutasProducto.carrito); */
router.get("/lista", rutasProducto.listado);

router.get("/crear", rutasProducto.crearForm)
router.post("/crear", upload.single("imagen"),rutasProducto.crear)

module.exports = router;

/* Luego chequear esto
router.get("/detalle/producto/:id", rutasProducto.detalle);
router.get("/carrito/:userid", rutasProducto.carrito);
*/
       