// Express instanciado y modulos requeridos
const express = require('express');
const app = express();
const methodOverride = require("method-override")
const session = require("express-session")
const userData = require("./middlewares/sessionData");
const cookieLogger= require("./middlewares/cookielogger")
var cookieParser = require('cookie-parser');
const Sequelize = require("sequelize");

// Motor de plantillas usado
app.set("view engine" , "ejs");

// Seteo de todos los middlewares globales y rutas por defecto publicas
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({secret: "esta frase no la va a leer nadie nunca jamas nunca jamas ni nunca jamas"}));
app.use(cookieParser());
app.use(cookieLogger);
app.use(userData);
// NO PRESTAR ATENCION A ESTA LINEA app.set("views", __dirname +"/public/views");

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// Routers importados
const rutasPrincipales = require("./routers/mainRouter");
const rutasProducto = require("./routers/productRouter");
const rutasUsuario = require("./routers/userRouter");
const rutasAPI = require("./routers/apiRouter")

// Rutas Principales

app.use("/", rutasPrincipales);

// Rutas de Producto

app.use("/producto" , rutasProducto);

// Rutas de Usuario

app.use("/usuario" , rutasUsuario);

// Rutas de API

app.use("/api", rutasAPI);

//Test coneccion BASE

var sequelize = new Sequelize('ladoa', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
  })
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



// Puerto escucha en el Numero:

app.listen(3000, ()=>{
    console.log('Servidor funcionando puerto 3000');
});

