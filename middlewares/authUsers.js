let logeado = (req,res,next) =>{
    if(req.session.userlogeado !== undefined){
        next();
    } else {
        res.render("authInvalid")
    }
}

module.exports = logeado