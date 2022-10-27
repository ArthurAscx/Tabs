let invitado = (req,res,next) =>{
    if(req.session.userlogeado === undefined){
        next();
    } else {
        res.render("authRequired")
    }

}

module.exports = invitado