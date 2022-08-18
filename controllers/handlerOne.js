const path = require("path");

const handlerOne = {
    index: (req,res)=>{
        res.render("index");
    },
    contacto: (req,res)=>{
        res.render("contacto");
    },
    ayuda: (req,res)=>{
        res.render("ayuda");
    }
}

module.exports = handlerOne;