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

  var to_index=0,from_index=0;
  var from_station_present = harbour_stations_till_csmt.find(ele =>{
    if(ele === from_station){
      return ele;
    }
    ++from_index;
  });
  var to_station_present = harbour_stations_till_csmt.find(ele =>{
    if(ele === to_station){
      return ele;
    }
    ++to_index;
  });



  if (from_station_present && to_station_present && from_index<4 && to_index>7) {

    // ------------------>
    const bestOption = await Best_Route(from_station_present, to_station_present, station_reach_time);


    // if no route found and value is {}
    if(Object.keys(bestOption).length === 0 && bestOption.constructor === Object){
      return res.status(200).json({
        type:"failure",
        train: "No train found"
      })
    }


    // if route is found

    if(bestOption.first_train){

      var firstTrainStartStationReachTime;
      from_station_present = from_station_present.charAt(0).toLowerCase() + from_station_present.slice(1);

      var firstTrainStartStationReachData = await bestOption.first_train.path.map(ele => {
        if(ele.station == from_station_present){
          console.log("true")
          firstTrainStartStationReachTime = ele.time;
        }
      })

    const array = firstTrainStartStationReachTime.split("");
    var hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
    var min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
    if(min == 59){
      hour++;
    }
    else{
      min++;
    }
    var firstTrainStartStationReachTime=(hour<9?"0"+hour.toString():hour.toString())+":"+(min<9?"0"+min.toString():min.toString());


      const secondOption = await Best_Route(from_station_present, to_station_present, firstTrainStartStationReachTime);


      // if no route found and value is {}
    if(Object.keys(secondOption).length === 0 && secondOption.constructor === Object){

      return res.status(200).json({
        type:"success",
        firstOption: {
          firstTrain:bestOption.first_train,
          secondTrain: bestOption.second_train
        },
        secondOption:{
          type:"failure",
          train: "No second train found"
        }
      })
    }

    if(secondOption.first_train){
      return res.status(200).json({
        type:"success",
        firstOption: {
          firstTrain:bestOption.first_train,
          secondTrain: bestOption.second_train
        },
        secondOption:{
          firstTrain:secondOption.first_train,
          secondTrain: secondOption.second_train
        }
      })
    }else{
      return res.status(200).json({
        type:"success",
        train1: bestOption,
        train2: secondOption
      })
    }
    }
    else{
      console.log(bestOption)
      return res.status(200).json({
        type:"success",
        train1: bestOption.taking_next_train?bestOption.taking_next_train:bestOption,
        train2: bestOption.taking_next_train2
      })
    }




  }
  else if(from_station_present && to_station_present && to_index<=7){


    var next_train = await getNextTrain(from_station_present.toLowerCase(), station_reach_time);

    var firstTrainReachTime = await getFirstTrainReachTime(next_train,from_station_present.toLowerCase());
      const array = firstTrainReachTime.split("");
      var Hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
      var Min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
      if(Min == 59){
        Hour++;
      }
      else{
        Min++;
      }
      var Time=(Hour<9?"0"+Hour.toString():Hour.toString())+":"+(Min<9?"0"+Min.toString():Min.toString());

      const taking_next_train = await getNextTrain(from_station_present.toLowerCase(), Time);

      return res.status(200).json({
        type:"success",
        train1: next_train,
        train2: taking_next_train
      })


  }


}


  const Best_Route = async (from_station_present, to_station_present, station_reach_time) => {
    console.log(station_reach_time)
    var next_train = await getNextTrain(from_station_present.toLowerCase(), station_reach_time);
    console.log(next_train.train_no)

    if (next_train.end_station == "thane") {
      var local_start_stations = ["Panvel", "Belapur CBD", "Nerul"];


      // time if catching train of thane
      const timeDiff = await findTimeToReachBelapurandGetNextTrain(next_train);

      // or time if we leave the thane train and catching next csmt train
      var firstTrainReachTime = await getFirstTrainReachTime(next_train,from_station_present.toLowerCase());
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

      const taking_next_train = await getNextTrain(from_station_present.toLowerCase(), time);

      if(taking_next_train.end_station == "thane"){
        console.log("again thane");
      }else{
        var timeDiffBetFirstAndSecondTrain =  await getTimeDiffBetFirstAndSecondTrain(next_train,taking_next_train);


        if(timeDiffBetFirstAndSecondTrain > timeDiff){
          console.log("if")
          return {"first_train":next_train,
                  "second_train":nextTrainAtBelapur};
        }else{

          var secondTrainReachTime = await getFirstTrainReachTime(taking_next_train,from_station_present.toLowerCase());
          const array = secondTrainReachTime.split("");
          var secondhour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
          var secondmin = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
          if(secondmin == 59){
            secondhour++;
          }
          else{
            secondmin++;
          }
          var secondtime=(secondhour<9?"0"+secondhour.toString():secondhour.toString())+":"+(secondmin<9?"0"+secondmin.toString():secondmin.toString());
          const taking_next_train2 = await getNextTrain(from_station_present.toLowerCase(), secondtime);

          return {taking_next_train,taking_next_train2};
        }
      }

    }
    else {
      console.log("next")
      return next_train;
    }

  }


  const getNextTrain = async (station , time)=>{

    const array = time.split("");
    const hour = parseInt(array[0]=="0"?array[1]:array[0]+array[1]);
    const min = parseInt(array[3]=="0"?array[4]:array[3]+array[4]);
    console.log(hour+"  "+min)
    var result;
    var resultTrain;

    console.log(station)
    switch (station) {
      case "panvel":
        result = await panvelSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "khandeshwar":

        result = await khandeshwarSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({"hour":1,"min":1});
        console.log("result")
        console.log(result)

        if(!result.length){
          return {};
        }

        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})
        console.log(resultTrain)
        return resultTrain;

      case "manasarover":
        result = await manasaroverSchema.find({"hour":{ $gte: hour },"min":{ $gte: min }}).sort({min:1}).sort({min:1});

        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "kharghar":
        result = await khargharSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "belapur cbd":
        result = await belapurSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "seawood darave":
        result = await seawoodSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "nerul":
        result = await nerulSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "juinagar":
        result = await juinagarSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "sanpada":
        result = await sanpadaSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "vashi":
        result = await vashiSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "mankhurd":
        result = await mankhurdSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "govandi":
        result = await govandiSchema.find({"hour":{ $gte:hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "chembur":
        result = await chemburSchema.find({"hour":{ $gte:hour },"min":{ $gte: min }}).sort({min:1});
        if(!result.length.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "tilaknagar":
        result = await tilaknagarSchema.find({"hour":{ $gte: hour },"min":{ $gte:min }}).sort({min:1});
        if(!result.length.length){
          return {};
        }
        resultTrain = await trainSchema.findOne({train_no:result[0].train_no})

        return resultTrain;

      case "kurla":
        result = await kurlaSchema.find({"hour":{ $gte: hour },"min":{ $gte: min }}).sort({min:1});
        if(!result.length.length){
          return {};
        }
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
  var updatedMin=min;
  if(min == 59){
    hour++;
  }
  else{
    updatedMin++;
  }
  var time=(hour<9?"0"+hour.toString():hour.toString())+":"+(updatedMin<9?"0"+updatedMin.toString():updatedMin.toString());
  console.log(time);
    nextTrainAtBelapur = await getNextTrain("belapur cbd", time);
   console.log(nextTrainAtBelapur);

   await nextTrainAtBelapur.path.map((ele) =>{
    if(ele.station=="belapur cbd"){
      nextTrainTime= ele.time;
    }
   });
   console.log(nextTrainTime)

  const array1 = nextTrainTime.split("");
  var hour1 = parseInt(array1[0]=="0"?array1[1]:array1[0]+array1[1]);
  var min1 = parseInt(array1[3]=="0"?array1[4]:array1[3]+array1[4]);

  console.log(hour1+"-"+hour)
  console.log(min1+"-"+min)

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
