let cookieLogger = (req,res,next) =>{
    if((req.cookie) && (req.cookie.recuerdame)){
        console.log(req.cookie.recuerdame);
        req.session.userlogeado = req.cookie.recuerdame;
        next();
    } else {
        next();
    }

}

module.exports = cookieLogger;