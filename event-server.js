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
