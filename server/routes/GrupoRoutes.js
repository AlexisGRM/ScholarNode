var chalk = require('chalk');
module.exports = function(io,Carrera){
	var mongoose = require('../../app/models/dbConnection');

	//Se importa el modelo
	var Grupo = require('../../app/models/grupo');
	var router = require('express').Router();
	/*
	// middleware to use for all requests
	router.use(function(req, res, next) {
	    // do logging
	    console.log('Something is happening.');
	    next(); // make sure we go to the next routes and don't stop here
	});*/

    // POST /api/grupo
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/Grupo')
    .post(function(req, res) {
        var carreraID = req.body._carrera;
        Carrera.findById(carreraID,function(err,carrera){
            if (err){console.log(chalk.red('Error: '+err));res.send(err); }
            else{
                var cantidadGrupos = carrera._grupos.length;
                //Se crea nuevo grupo
                var nuevoGrupo = new Grupo({
                    //Se define nombre de nuevo grupo, ej. TIC1-1, TIC2-1
                    nombre:carrera.abreviacion+(cantidadGrupos+1)+'-1',
                    _carrera:req.body._carrera,
                });
                
                // save the Carrera and check for errors
                nuevoGrupo.save(function(err) {
                    if (err){console.log(chalk.red('Error: '+err));res.send(err); }
                    else{
                        console.log('DONE!');
                        io.sockets.emit('grupoCreado',nuevoGrupo);

                        carrera._grupos.push(nuevoGrupo._id);
                        carrera.save(function(err){
                            if (err){console.log(chalk.red('Error: '+err));res.send(err); }
                        });

                        res.json(nuevoGrupo);
                    }
                });
            }
        });
    });

    // GET /api/grupo
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo')
    .get(function(req, res) {

        //Listado de todas las carreras
        Grupo.find(function(err,grupos) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(grupos);
            }
        });
        
    });

    // GET /api/grupo/:id
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Listado de todas las carreras
        Grupo.findById(id).populate('_alumnos').exec(function(err,grupo) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(grupo);
            }
        });
        
    });

    // DELETE /api/grupo/:id
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        //Listado de todas las carreras
        Grupo.findById(id)
        .remove(function(err,data) {
            if (err){console.log('Error');res.send(err);}
            else{
                console.log('DONE!');
                res.json(data);
            }
        });
        
    });

    // POST /api/grupo/registrarAlumnos/:grupoID
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo/registrarAlumnos/:grupoID')
    .post(function(req, res) {
        var grupoID = req.params.grupoID;
        var alumnos = req.body.alumnos;
        var alumnosIDs = new Array();
        alumnos.forEach(function(alumno){
            alumnosIDs.push(alumno._id);
        });
        //Listado de todas las carreras
        Grupo.findById(grupoID,function(err,grupo) {
            if (err){console.log(chalk.red('Error: '+err));res.send(err);}
            else{
                grupo._alumnos = alumnosIDs;
                grupo.save(function(err){
                    if (err){console.log(chalk.red('Error: '+err));res.send(err);}
                    
                    io.sockets.emit('alumnosRegistrados',grupoID);
                    //DISEÑAR EMIT DE CAMBIOS SALVADOS
                    res.json(grupo);
                });
            }
        });
        
    });
    return {router:router,model:Grupo};
};