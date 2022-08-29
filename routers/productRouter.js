const express = require("express");

const router = express.Router();

const rutasProducto = require("../controllers/productHandler");

router.get("/detalle/:id", rutasProducto.detalle);
// router.get("/detalle", rutasProducto.detalleCatch) NECEISTAMOS UN CATCHH
router.get("/carrito", rutasProducto.carrito);

router.get("/edicion", rutasProducto.creacionEdicion);
/* router.post("/creacionEdicion", rutasProducto.carrito); */

module.exports = router;

/* Luego chequear esto
router.get("/detalle/producto/:id", rutasProducto.detalle);
router.get("/carrito/:userid", rutasProducto.carrito);
*/
       