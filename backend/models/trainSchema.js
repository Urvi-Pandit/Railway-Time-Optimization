const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    train_no:{
        type: Number,
        required: true
    },
    start_time:{
        type: Date,
        required: true,
        default: Date.now
    },
    end_time:{
        type: Date,
        required: true,
        default: Date.now
    },
    paths:{
      type: Array,
      default:undefined
    },
    type:{
      type: String,
      default: "harbour"
    }

  });

module.exports = mongoose.model('traincontents', TrainSchema);