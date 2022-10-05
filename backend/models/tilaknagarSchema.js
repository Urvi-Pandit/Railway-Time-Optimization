const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const tilaknagarSchema = new Schema({
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

module.exports = mongoose.model('tilaknagars', tilaknagarSchema);