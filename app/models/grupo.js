var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GrupoSchema   = new Schema({
    nombre: String,
    _alumnos : [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
	_carrera : { type: String, ref: 'Carrera' },
},
{
  timestamps: true
});

module.exports = mongoose.model('Grupo', GrupoSchema);