const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    train_no:{
        type: Number
    },
    start_time:{
        type: String
    },
    end_time:{
        type: String
    },
    start_station:{
      type: String
    },
    end_station:{
      type: String
    },
    path:{
      type: Array
    },
    line:{
      type: String,
      default: "harbour"
    },
    type:{
      type: String,
      default: "slow"
    }

  });

module.exports = mongoose.model('trains', TrainSchema);