let cookieLogger = (req,res,next) =>{
    console.log(req.cookies)
    if(req.cookies && (req.cookies.recuerdame)){
        req.session.userlogeado = req.cookies.recuerdame;};

        next();
    
}

module.exports = cookieLogger;