//Codigo para conectarse a la base de datos mongo
/*var mongoose   = require('mongoose');
var urlDB = 'mongodb://heroku_333sk3h5:u1e5mba166ao0omqusdiv5iuq0@ds011893.mlab.com:11893/heroku_333sk3h5';
mongoose.connect(urlDB); // connect to our databa*/
var mongoose = require('../../app/models/dbConnection');
/*****/

//Codigo para declarar un router
var express = require('express');
var router = express.Router();

//GET localhost:8000/api/Depositos
router.route("/Depositos")
	.get(function(req,res){
		console.log("Entro el GET de depositos");
		res.send("Funciona tu GET");
	});

//POST localhost:8000/api/Depositos
router.route("/Depositos")
	.post(function(req,res){
		console.log("Entro el POST de depositos");
		res.send("Funciona tu POST");
	});

module.exports = router;