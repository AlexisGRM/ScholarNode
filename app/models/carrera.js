var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarreraSchema   = new Schema({
    num: Number,
    nombre: String,
    abreviacion: String,
    _alumnos : [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
    _grupos : [{ type: Schema.Types.ObjectId, ref: 'Grupo' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Carrera', CarreraSchema);