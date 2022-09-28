const mongoose = require('mongoose');

const trainSchema = require('../../models/trainSchema');
const panvelSchema = require('../../models/panvelSchema');
const khandeshwarSchema = require('../../models/khandeshwarSchema');
const khargharSchema = require('../../models/khargharSchema');
const kurlaSchema = require('../../models/kurlaSchema');
const belapurSchema = require('../../models/belapurSchema');
const chemburSchema = require('../../models/chemburSchema');
const govandiSchema = require('../../models/govandiSchema');
const juinagarSchema = require('../../models/juinagarSchema');
const manasaroverSchema = require('../../models/manasaroverSchema');
const mankhurdSchema = require('../../models/mankhurdSchema');
const nerulSchema = require('../../models/nerulSchema');
const sanpadaSchema = require('../../models/sanpadaSchema');
const seawoodSchema = require('../../models/seawoodSchema');
const tilaknagarSchema = require('../../models/tilaknagarSchema');
const vashiSchema = require('../../models/vashiSchema');


var nextTrainAtBelapur;




exports.provideMaxRoute = async (req, res, next) => {

  var from_station = req.body.from;
  var to_station = req.body.to;
  var station_reach_time = req.body.time;


  var harbour_stations_till_csmt = ["Panvel", "Khandeshwar", "Manasarovar", "Kharghar", "Belapur CBD", "Seawood Darave", "Nerul", "Juinagar", "Sanpada", "Vashi", "Mankhurd", "Govandi", "Chembur", "Tilaknagar", "Kurla", "Chunabhatti", "GTB Nagar", "Vadala Road", "Sewri", "Cotton Green", "Reay Road", "Dockyard Road", "Sandhurst Road", "Masjid", "CSMT"];

  var from_station_present = harbour_stations_till_csmt.find(ele => ele === from_station);
  var to_station_present = harbour_stations_till_csmt.find(ele => ele === to_station);


  if (from_station_present && to_station_present) {

    const value = await Best_Route(from_station_present, to_station_present, station_reach_time);
    if(value.first_train){
      return res.status(200).json({
        type:"success",
        firstTrain: value.first_train,
        secondTrain: value.second_train
      })
    }else{
      return res.status(200).json({
        type:"success",
        train: value
      })
    }

  }


}


  const Best_Route = async (from_station_present, to_station_present, station_reach_time) => {
    var next_train = await getNextTrain(from_station_present.toLowerCase(), station_reach_time);

    if (next_train.end_station == "thane") {
      var local_start_stations = ["Panvel", "Belapur CBD", "Nerul"];


      // time if catching train of thane
      const timeDiff = await findTimeToReachBelapurandGetNextTrain(next_train);
      console.log(timeDiff);

      // or time if we leave the thane train and catching next csmt train
      var firstTrainReachTime = await getFirstTrainReachTime(next_train,from_station_present.toLowerCase());
      console.log(firstTrainReachTime);
      const array = firstTrainReachTime.split("");
      var hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
      var min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
      if(min == 59){
        hour++;
      }
      else{
        min++;
      }
      var time=(hour<9?"0"+hour.toString():hour.toString())+":"+(min<9?"0"+min.toString():min.toString());
      console.log(time);

      const taking_next_train = await getNextTrain(from_station_present.toLowerCase(), time);

      if(taking_next_train.end_station == "thane"){
        console.log("again thane");
      }else{
        var timeDiffBetFirstAndSecondTrain =  await getTimeDiffBetFirstAndSecondTrain(next_train,taking_next_train);

        if(timeDiffBetFirstAndSecondTrain >= timeDiff){
          return {"first_train":next_train,
                  "second_train":nextTrainAtBelapur};
        }else{
          return taking_next_train;
        }
      }

    }
    else {
      return next_train;
    }

  }


  const getNextTrain = async (station , time)=>{

    const array = time.split("");
    const hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
    const min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
    var result;
    var resultTrain;

    console.log(station)
    switch (station) {
      case "panvel":
        result = await panvelSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "khandeshwar":

        result = await khandeshwarSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "manasarover":
        result = await manasaroverSchema.find({"hour":{ $gte: hour },"min":{ $gte: min }}).sort({min:1}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "kharghar":
        result = await khargharSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "belapur cbd":
        result = await belapurSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "seawood darave":
        result = await seawoodSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "nerul":
        result = await nerulSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "juinagar":
        result = await juinagarSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "sanpada":
        result = await sanpadaSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "vashi":
        result = await vashiSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "mankhurd":
        result = await mankhurdSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "govandi":
        result = await govandiSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "chembur":
        result = await chemburSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "tilaknagar":
        result = await tilaknagarSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "kurla":
        result = await kurlaSchema.find({"hour":{ $gte: hour },"min":{ $gte: min }}).sort({min:1});
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      default:
        return {};
    }
  }


  const findTimeToReachBelapurandGetNextTrain = async(nextTrain)=>{
  var belapurReachTime;
  var nextTrainTime;

  await nextTrain.path.map((ele) =>{
    if(ele.station=="belapur cbd"){
      belapurReachTime= ele.time;
    }

   });

   console.log(belapurReachTime);

   const array = belapurReachTime.split("");
  var hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
  var min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
  if(min == 59){
    hour++;
  }
  else{
    min++;
  }
  var time=(hour<9?"0"+hour.toString():hour.toString())+":"+(min<9?"0"+min.toString():min.toString());
  console.log(time);
    nextTrainAtBelapur = await getNextTrain("belapur cbd", time);
   console.log(nextTrainAtBelapur);

   await nextTrainAtBelapur.path.map((ele) =>{
    if(ele.station=="belapur cbd"){
      nextTrainTime= ele.time;
    }
   });

   const array1 = nextTrainTime.split("");
  var hour1 = parseInt(array1[0]=="0"?array1[1]:array1[0]+array1[1]);
  var min1 = parseInt(array1[3]=="0"?array1[4]:array1[3]+array1[4]);

  var hDiff = hour1 - hour;
  var mDiff = min1 - min;
  if(hour1>hour)
   {
    mDiff = (60-min)+min1;
    hDiff=0;
   }


  console.log(hDiff);
  console.log(mDiff);

   return mDiff;

  }


  const getFirstTrainReachTime = async(nextTrain,station)=>{
    var belapurReachTime;

    await nextTrain.path.map((ele) =>{
      if(ele.station==station){
        belapurReachTime= ele.time;
      }
     });

     return belapurReachTime;

  }


  const getTimeDiffBetFirstAndSecondTrain=async(firstTrain,secTrain)=>{
    const array = firstTrain.start_time.split("");
    var hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
    var min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);

    const array1 = secTrain.start_time.split("");
    var hour1 = parseInt(array1[0]=="0"?array1[1]:array1[0]+array1[1]);
    var min1 = parseInt(array1[3]=="0"?array1[4]:array1[3]+array1[4]);

    var hDiff = hour1 - hour;
    var mDiff = min1 - min;
    if(hour1>hour)
     {
      mDiff = (60-min)+min1;
      hDiff=0;
     }


    console.log(hDiff);
    console.log(mDiff);

     return mDiff;
  }
