const express = require("express");
const router = express.Router();

const rutasApiDisc = require("../api/discs")
const rutasApiUser = require("../api/users")

// DISCOS
router.get("/discs/all", rutasApiDisc.all);
router.get("/discs/detail/:id", rutasApiDisc.disc);
router.post("/discs/create", rutasApiDisc.newDisc)
router.put("/discs/edit/:id", rutasApiDisc.editDisc)
router.get("/discs/find", rutasApiDisc.find);
router.delete("/discs/kill/:id", rutasApiDisc.delete);

// USUARIOS
router.get("/users/all", rutasApiUser.all);
router.get("/users/detail/:id", rutasApiUser.user);
router.post("/users/create", rutasApiUser.newUser)
router.put("/users/edit/:id", rutasApiUser.editUser)
router.get("/users/find", rutasApiUser.find);
router.delete("/users/kill/:id", rutasApiUser.delete);

module.exports = router;