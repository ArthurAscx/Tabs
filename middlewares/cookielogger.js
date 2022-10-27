let cookieLogger = (req,res,next) =>{
    if(req.cookies && (req.cookies.recuerdame)){
        req.session.userlogeado = req.cookies.recuerdame;};
        next();
}

module.exports = cookieLogger;