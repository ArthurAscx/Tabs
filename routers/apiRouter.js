const express = require("express");
const router = express.Router();

const rutasAPI = require("../api/discs")


router.get("/discs/all", rutasAPI.all);
router.get("/discs/detail/:id", rutasAPI.disc);
router.post("/discs/create", rutasAPI.newDisc)
router.put("/discs/edit/:id", rutasAPI.editDisc)
router.get("/discs/find", rutasAPI.find);
router.delete("/discs/kill/:id", rutasAPI.delete);


module.exports = router;