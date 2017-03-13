module.exports = function(io){
    var mongoose = require('../../app/models/dbConnection');
    //Se importa el modelo
    var Carrera = require('../../app/models/carrera');

    var router = require('express').Router();
    // middleware to use for all requests
    /*router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });*/

    // POST /api/carrera
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/carrera')
    .post(function(req, res) {
        // create a new instance of the carrera model
        var nuevaCarrera = new Carrera({
            nombre:req.body.nombre,
            abreviacion:req.body.abreviacion
        });
        
        // save the Carrera and check for errors
        nuevaCarrera.save(function(err) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                io.sockets.emit('carreraCreada',nuevaCarrera);
                res.json(nuevaCarrera);
            }
        });
    });

    // PUT /api/carrera
    /*
    * Edita un objeto de esta entidad
    */
    router.route('/carrera')
    .put(function(req, res) {
        // Busca instancia existente en la base de datos
        Carrera.findById(req.body._id,function(err,carrera){
            carrera.nombre = req.body.nombre;
            carrera.abreviacion = req.body.abreviacion;
            carrera.num = req.body.num;
            // save the Carrera and check for errors
            carrera.save(function(err) {
                if (err){
                    console.log('Error');
                    res.send(err);
                }else{
                    console.log('DONE!');
                    io.sockets.emit('carreraEditada',carrera);
                    res.json(carrera);
                }
            });
        });
        
    });

    // GET /api/carrera
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/carrera')
    .get(function(req, res) {

        //Listado de todas las carreras
        Carrera.find(function(err,carreras) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(carreras);
            }
        });
        
    });

    // DELETE /api/carrera:id
    /*
    * Elimina el registro identificado por el ID indicado
    */
    router.route('/carrera/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        console.log("id: "+id);
        //Listado de todas las carreras
        Carrera.findOne({_id:id}).remove().exec(function(err,data) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!: '+data);
                io.sockets.emit('carreraEliminada',id);
                res.json(data);
            }
        });
        
    });

    // GET /api/carrera:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/carrera/:id')
    .get(function(req, res) {
        var id = req.params.id;
        console.log("id: "+id);
        //Listado de todas las carreras
        Carrera.findOne({_id:id})
        .populate("_grupos")
        .exec(function(err,carrera) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(carrera);
            }
        });
        
    });


    return {router:router,model:Carrera};
};