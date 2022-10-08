let userData = (req,res,next) =>{
    if(req.session.userlogeado !== undefined){
        res.locals.userData = req.session.userlogeado};
        next();

    /* next(); */ //aca debería ir
}

module.exports = userData