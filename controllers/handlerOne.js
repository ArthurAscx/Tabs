const path = require("path");

const handlerOne = {
    index: (req,res)=>{
        res.sendFile(path.join(__dirname , '../views/index.html'));
    },
    contacto: (req,res)=>{
        res.sendFile(path.join(__dirname , '../views/contacto.html'));
    },
    ayuda: (req,res)=>{
        res.sendFile(path.join(__dirname , '../views/ayuda.html'));
    }
}

module.exports = handlerOne;