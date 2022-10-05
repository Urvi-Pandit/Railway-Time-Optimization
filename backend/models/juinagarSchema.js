const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const juinagarSchema = new Schema({
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

module.exports = mongoose.model('juinagars', juinagarSchema);