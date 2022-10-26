const express = require("express");
const router = express.Router();

const rutasAPI = require("../api/discs")


router.get("/discs/all", rutasAPI.all);
router.get("/discs/:id", rutasAPI.disc);
router.post("/discs/create", rutasAPI.newDisc)
//router.get("/contacto", rutasPrincipales.contacto);
//router.get("/ayuda", rutasPrincipales.ayuda);

module.exports = router;