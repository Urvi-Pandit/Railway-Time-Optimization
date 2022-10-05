const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const panvelSchema = new Schema({
    train_no:{
        type: Number
    },
    time:{
        type: String
    },
    hour:{
        type: Number
    },
    min:{
      type: Number,
    }

  });

module.exports = mongoose.model('panvels', panvelSchema);