var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
   
     startTime: {
     	 type : Date
     },
     duration: {
         type: Date
     },
     subjectDescription: {
     	 type:String
     },
     startDate: {
         type: Date    
     }
});


var Meetings = mongoose.model('Meeting', meetingSchema);

module.exports = Meetings;