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