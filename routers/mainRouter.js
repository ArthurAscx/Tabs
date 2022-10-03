const express = require("express");
const router = express.Router();

const rutasPrincipales = require("../controllers/handlerOne");


router.get("/", rutasPrincipales.index);
router.get("/preguntasFrecuentes", rutasPrincipales.preguntas)
//router.get("/contacto", rutasPrincipales.contacto);
//router.get("/ayuda", rutasPrincipales.ayuda);

module.exports = router;