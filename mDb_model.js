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

