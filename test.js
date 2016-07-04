//event-server.js

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./routes/event_routes");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(express.static(__dirname + '/public'));

router.get("/Events",mongoOp.getEventDetail);
router.get("/Agenda/:agendaId",mongoOp.getAgendaDetails);
router.get("/Location",mongoOp.getLocationDetails);
router.get("/Agenda/Comments/:agendaItemId",mongoOp.getCommentsList);
router.get("/Agenda/Likes/:agendaItemId",mongoOp.getLikeList);

app.use('/EventApp',router);

app.listen(8088);
console.log("Listening to PORT 8088");


//mDb_mopdel.js
/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_event');

var mDb_schema = mongoose.Schema;

var eventSchema = {
		"name" : String,
		"from" : String,
		"to" : String,
		"location" : String,
};

var basicAgendaSchema = {
		"dt" : String,
		"name" : String,
		"image" : String
};

var agendaDetailSchema = {
		"agendaId" : String,
		"start" : String,
		"end" : String,
		"agenda" : String,
		"image" : String,
		"comments" : Number,
		"likes" :Number
};

var locationSchema = {
		"eventLoc" : String,
		"eventAddress" : String,
		"stayLoc" : String,
		"stayAddress" : String,
		"check-in" : String,
		"check-out" :String
};

var likesSchema = {
		"agendaItemId" : String,
		"name" : String,
		"like" : Boolean
};

var commentsSchema = {
		"agendaItemId" : String,
		"name" : String,
		"message" : String
};

var EventDetailModel = mongoose.model('eventDetail',eventSchema,"eventData");
var AgendaDataModel = mongoose.model('agendaSummary',basicAgendaSchema,"agendaData");
var AgendaDetailModel = mongoose.model('agendaDetail',agendaDetailSchema,'agendaDetail');
var LocationDataModel = mongoose.model('locationDetail',locationSchema,'stayDetails');
var likesDataModel = mongoose.model('likesData',likesSchema,'LikeList');
var commentsDataModel = mongoose.model('commentsData', commentsSchema, 'commentList');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
  //do operations which involve interacting with DB.
});

module.exports.EventDetailModel = EventDetailModel;

module.exports.AgendaDataModel = AgendaDataModel;

module.exports.AgendaDetailModel = AgendaDetailModel;

module.exports.LocationDataModel = LocationDataModel;

module.exports.likesDataModel = likesDataModel;

module.exports.commentsDataModel = commentsDataModel;






//event_routes.js

/**
 * http://usejsdoc.org/
 */
var mongoModels = require('../models/mDb_model');

module.exports.getEventDetail = function(req, res) {

	mongoModels.EventDetailModel.find({},function(err, eventDet) {
		  if (err) {
			  return console.error("In getEventDetail eventDet--"+err);
		  }
		  mongoModels.AgendaDataModel.find({},function(err, agendaDet) {
			  if (err) {
				  return console.error("In getEventDetail agendaDet--"+err);
			  }
			  eventDet.push(agendaDet);
			  console.log("In getEventDetail at--"+new Date());
			  res.json(eventDet);
			});
		});
};

module.exports.getAgendaDetails = function(req,res){
	mongoModels.AgendaDetailModel.find({"agendaId" : req.params.agendaId},function(err,agendaDet){
		if(err) {
			return console.error("In getAgendaDetails--"+err);
		}
		console.log("In getAgendaDetails at--"+new Date());
		res.json(agendaDet);
	});
	
};

module.exports.getLocationDetails = function(req,res){
	mongoModels.LocationDataModel.find({},function(err,locationDet){
		if(err){
			return console.error("Error in getLocationDetails--"+err);
		}
		console.log("In getLocationDetails at--"+new Date());
		res.json(locationDet);
	});
};

module.exports.getCommentsList = function(req,res){
	mongoModels.commentsDataModel.find({"agendaItemId" : req.params.agendaItemId},function(err,commentsData){
		if(err){
			return console.error("Error in getCommentsList--"+err);
		}
		console.log("In getCommentsList at--"+new Date());
		res.json(commentsData);
	});
};

module.exports.getLikeList = function(req,res){
	mongoModels.likesDataModel.find({"agendaItemId" : req.params.agendaItemId}, function(err,likesData){
		if(err){
			return console.error("Error in getLikeList--"+err);
		}
		console.log("In getLikeList at--"+new Date());
		res.json(likesData);
	});
};