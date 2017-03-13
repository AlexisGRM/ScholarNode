var chalk = require('chalk');
module.exports = function(io, Carrera, Grupo, Usuario){
    var mongoose = require('../../app/models/dbConnection');
    
    //Se importa el modelo
    var Alumno = require('../../app/models/alumno');

    var router = require('express').Router();
    
    // POST /api/Alumno
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/Alumno')
    .post(function(req, res) {
        var nuevoUsuario = new Usuario({
            email: req.body.user.email,
            password: req.body.user.password,
            rol: "alumno",
        });

        // create a new instance of the Alumno model
        var nuevoAlumno = new Alumno({
            Nombre:req.body.alumno.Nombre,
            ApellidoP:req.body.alumno.ApellidoP,
            ApellidoM:req.body.alumno.ApellidoM,
            FechaNac:req.body.alumno.FechaNac,
            _carrera: req.body.alumno._carrera,
            _grupo:'',
            _usuario: nuevoUsuario._id
        });

        // save the Alumno and check for errors
        nuevoAlumno.save(function(err) {
            //Se guarda usuario asociado al alumno
            nuevoUsuario.save(function(err){if(err){console.log(chalk.red('error guardar usuario: '+err));res.send(err);}});
            
            if (err){console.log(chalk.red('error guardar alumno'));res.send(err);}
            else{
                console.log(chalk.green('**NUEVO ALUMNO CREADO**'));
                //Si el nuevo alumno es registrado, se relaciona con su carrera
                Carrera.findById(nuevoAlumno._carrera,
                function(err,carrera){
                    if (err){console.log('error buscar carrera');res.send(err);}
                    else{
                        //Se hace la relacion alumno-carrera
                        carrera._alumnos.push(nuevoAlumno);
                        carrera.save(function(err){
                            if(err){console.log('error guardar cambios carrera');res.send(err);}
                            else{
                                console.log(chalk.green('AlumnoCreado'));
                                console.log(chalk.green(nuevoAlumno));
                                nuevoAlumno._carrera = carrera;
                                io.sockets.emit('AlumnoCreado',nuevoAlumno);
                                res.json(nuevoAlumno);
                            }
                        });
                    }
                });
            }
        });
    });

    // PUT /api/Alumno
    /*
    * Edita un objeto de esta entidad
    */
    router.route('/Alumno')
    .put(function(req, res) {
        // Busca instancia existente en la base de datos
        Alumno.findById(req.body._id,function(err,alumnoEditado){
            //Se registran los nuevos valores de los atributos de la entidad
            alumnoEditado.Nombre=req.body.Nombre;
            alumnoEditado.ApellidoP=req.body.ApellidoP;
            alumnoEditado.ApellidoM=req.body.ApellidoM;
            alumnoEditado.FechaNac=req.body.FechaNac;
            alumnoEditado.noMatricula=req.body.noMatricula;
            var tempCarreraID = alumnoEditado._carrera;
            alumnoEditado._carrera= req.body._carrera;

            // save the Alumno and check for errors
            alumnoEditado.save(function(err) {
                if (err){ console.log(chalk.red('Error: '+err)); res.send(err); }
                else{
                    console.log(chalk.green('**AlumnoEditado'));
                    io.sockets.emit('AlumnoEditado',alumnoEditado);
                    if(tempCarreraID!=alumnoEditado._carrera){
                        //Si el nuevo alumno es reogistrado, se relaciona con su carrera
                        Carrera.findById(alumnoEditado._carrera,
                        function(err,carrera){
                            if (err){console.log('error buscar carrera');res.send(err);}
                            else{
                                //Se hace la relacion alumno-carrera
                                carrera._alumnos.push(alumnoEditado);
                                carrera.save(function(err){
                                    if(err){console.log('error guardar cambios carrera');res.send(err);}
                                    else console.log('alumno asociado a su nueva carrera'); 
                                });
                            }
                        });
                    }
                    res.json(alumnoEditado);
                }
            });
        });
    });

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Alumno/')
    .get(function(req, res) {
        //Listado de todas las Alumnos
        Alumno.find().populate("_carrera").exec(function(err,Alumnos) {
            if (err){console.log(chalk.red('Error: '+err));res.send(err);}
            else{
                res.json(Alumnos);
            }
        });
    });

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los alumnos preinscritos
    */
    router.route('/Alumno/soloPreinscritos')
    .get(function(req, res) {

        //Listado de todas las Alumnos
        Alumno.find().populate("_carrera").exec(function(err,Alumnos) {
            Alumnos = Alumnos.filter(function(alumno){
                return !alumno._grupo;
            });
            //console.log(Alumnos);

            if (err){console.log(chalk.red('Error: '+err));res.send(err);
            }else{
                res.json(Alumnos);
            }
        });
    });

    // DELETE /api/Alumno:id
    /*
    * Elimina el registro identificado por el ID indicado
    */
    router.route('/Alumno/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        console.log("id: "+id);
        //Listado de todas las Alumnos
        Alumno.findOne({_id:id}).remove().exec(function(err,data) {
            if (err){console.log(chalk.red('Error: '+err));res.send(err);}
            else{
                console.log(chalk.green('**AlumnoEliminado'));
                io.sockets.emit('AlumnoEliminado',id);
                res.json({data:data});
            }
        });
    });

    // GET /api/Alumno:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/Alumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Se busca por ID
        Alumno.findById(id).populate('_usuario').exec(function(err,alumno) {
            if (err){console.log(chalk.red('Error: '+err)); res.send(err);
            }else{
                res.json(alumno);
            }
        });
    });

    // GET /api/Alumno:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/Alumno/registrarAlumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        var grupoDelAlumno;
        //Se busca por ID
        Alumno.findById(id, function(err,alumno) {
            if (err){res.send(err);}
            else{
                Carrera.findById(alumno._carrera)
                .populate('_grupos')
                .exec(function(err,carrera){
                    if (err){console.log('Error');res.send(err);}
                    else{
                        //Si no habia grupos de la carrera
                        if(carrera._grupos.length===0){ 
                            //Se crea uno nuevo grupo y se asocia al alumno
                            var nuevoGrupo = new Grupo({
                                nombre:carrera.abreviacion+'1-1',
                                _alumnos:[alumno._id],
                                _carrera:carrera._id
                            });
                            //Se asocia el nuevo grupo a su carrera correspondiente
                            nuevoGrupo.save(function(err){
                                if (err){
                                    console.log(chalk.red('Error: '+err));
                                    res.send(err);
                                }
                                else{
                                    //Asociacion el grupo a la carrera
                                    carrera._grupos.push(nuevoGrupo._id);
                                    carrera.save(function(err){
                                        if (err){res.send(err);}
                                        else{
                                            //Asociar el grupo al alumno
                                            asociar_Grupo_Alumno(Alumno,alumno, nuevoGrupo, carrera, io);
                                            //Notificar creacion de nuevo grupo
                                            console.log(chalk.green('**grupoCreado: '+nuevoGrupo));
                                            io.sockets.emit('grupoCreado',nuevoGrupo);
                                            res.json(nuevoGrupo);
                                        }
                                    });
                                }
                            });
                        //Si la carrera ya tenia grupos registrados
                        }else{
                            //Se busca el primer grupo de la carrera y se asocia el alumno
                            Grupo.findById(carrera._grupos[0]._id).populate('_carrera').exec(function(err,grupo){
                                console.log(chalk.blue('grupo: '+grupo));
                                grupo._alumnos.push(alumno._id);
                                grupo.save(function(err){
                                    if (err){res.send(err);}
                                    else{
                                        console.log(chalk.green('**Alumno '+alumno._id+' asociado a grupo '+grupo._id));
                                        //Asociar grupo a alumno
                                        asociar_Grupo_Alumno(Alumno,alumno, grupo,grupo._carrera, io);
                                        res.json(grupo);
                                    }
                                });
                            });
                        }
                    }
                });
            }
        });
    });


    return router;
};

function asociar_Grupo_Alumno(AlumnoDB, alumno, grupo,carrera, io){
    //Se asocia el grupo con el alumno
    alumno._grupo = grupo._id;

    /*Se genera el numero de matricula con el formato YY30NNCCC donde:
        YY: Digitos del año
        NN: Num. Carrera x 10
        CCC: Contador alumnos */
    var noMatricula = alumno.createdAt.getFullYear().toString().substr(2,2);
    noMatricula+='30';
    noMatricula+=carrera.num*10;
    var numAlumnos = grupo._alumnos.length;
    noMatricula+=numAlumnos<10?'0'+numAlumnos:numAlumnos;
    alumno.noMatricula = noMatricula;
    console.log(chalk.red(alumno.noMatricula));

    //Se guardan los cambios en el alumno
    alumno.save(function(err){ 
        if (err){console.log(chalk.red('Error: '+err));}
        else{
            AlumnoDB.findById(alumno._id).populate('_grupo').exec(function(err,alumno){
                if (err){console.log(chalk.red('Error: '+err));}
                io.sockets.emit('alumnoInscritoAGrupo', alumno);
                console.log(chalk.green('Se registro grupo a alumno: '+alumno));
            });
        }
    });
}