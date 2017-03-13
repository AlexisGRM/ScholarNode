var mongoose   = require('mongoose');
var urlDB = 'mongodb://heroku_333sk3h5:u1e5mba166ao0omqusdiv5iuq0@ds011893.mlab.com:11893/heroku_333sk3h5';
mongoose.connect(urlDB); // connect to our databa

module.exports = mongoose;