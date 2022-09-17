const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const StationSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    train_timetable_up:{
         type: Array,
         required: true
    },
    train_timetable_down:{
      type: Array,
      required: true
 }

  });

module.exports = mongoose.model('stationcontents', StationSchema);