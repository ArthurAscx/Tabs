const express = require("express");

const router = express.Router();

const rutasProducto = require("../controllers/productHandler");

router.get("/detalle", rutasProducto.detalle);
router.get("/carrito", rutasProducto.carrito);

module.exports = router;

/* Luego chequear esto
router.get("/detalle/producto/:id", rutasProducto.detalle);
router.get("/carrito/:userid", rutasProducto.carrito);
*/
       