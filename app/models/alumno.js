var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlumnoSchema   = new Schema({
	noMatricula: String,
	Nombre : String,
	ApellidoP : String,
	ApellidoM : String,
	FechaNac : Date,
	_carrera : { type: String, ref: 'Carrera' },
	_grupo :  { type: String, ref: 'Grupo' },
	_usuario : { type: String, ref: 'Usuario' },
},
{
  timestamps: true
});

module.exports = mongoose.model('Alumno', AlumnoSchema);