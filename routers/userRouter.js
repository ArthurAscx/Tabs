const express = require("express");

const router = express.Router();

const rutasUsuario= require("../controllers/userHandler");

//router.get("/detalle", rutasUsuario.perfil);
router.get("/login", rutasUsuario.login);
router.get("/register", rutasUsuario.register);
router.get("/preguntasFrecuentes",rutasUsuario.preguntas)

module.exports = router;

/* Luego chequear esto
router.get("/user/:id", rutasUsuario.perfil);
router.get("/carrito/:userid", rutasProducto.carrito);
*/
