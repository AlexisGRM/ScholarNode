/***CREATE SERVER **/
var express		= require('express');
var http 	= require('http');
var app 		= express();

// Get dependencies
var bodyParser	= require('body-parser');
var path 		= require('path');
var morgan		= require('morgan');

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Instace server
var server 	= http.createServer(app); //HTTP server
var io 		= require('socket.io').listen(server); //Websocket init

/*JUST IN TEST*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

var carreraRouterDB = require('./server/routes/CarreraRoutes')(io);
var routerCarrera = carreraRouterDB.router; //Se toma la ruta
var CarreraModel = carreraRouterDB.model; //Se toma el modelo

var grupoRouterDB = require('./server/routes/GrupoRoutes')(io,CarreraModel);
var routerGrupo = grupoRouterDB.router; //Se toma la ruta
var GrupoModel = grupoRouterDB.model; //Se toma el modelo

var usuarioRouterDB = require('./server/routes/UsuarioRoutes')(io);
var routerUsuario = usuarioRouterDB.router; //Se toma la ruta
var UsuarioModel = usuarioRouterDB.model; //Se toma el modelo
//Las rutas de alumno ocupan del modelo de carrera
var routerAlumno = require('./server/routes/AlumnoRoutes')(io,CarreraModel,GrupoModel,UsuarioModel);

// middleware to use for all requests before executing
app.use(function(req, res, next) {
    // do logging
    //console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//Se asocian las rutas de las entidades a cada 
app.use('/api', routerCarrera);
app.use('/api', routerGrupo);
app.use('/api', routerAlumno);
app.use('/api', routerUsuario);


var depositoRouter = require('./server/routes/DepositoRoutes');
app.use('/api', depositoRouter);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**Get port from environment and store in Express.**/
//var port = process.env.PORT || '3000';
var port = process.env.PORT || '8000';
app.set('port', port);

/** Listen on provided port, on all network interfaces. **/
server.listen(port, () => console.log(`API running on localhost:${port}`));
io.set("origins", "*:*");