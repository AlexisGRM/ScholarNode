var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuarioSchema   = new Schema({
	email:String,
	password:String,
	rol:String,
},
{
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);