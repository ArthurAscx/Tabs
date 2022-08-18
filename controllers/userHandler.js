const path = require("path");
const userHandler = {
    login: (req,res)=>{
        res.render("login");
    },
    register: (req,res)=>{
        res.render("register");
    },
};

module.exports = userHandler;