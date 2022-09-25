// const passport = require('passport');
// const mongoose = require('mongoose');
// const bcryptjs= require('bcryptjs')
// const UserSchema = require('../../models/UserSchema');
// const TotalScoreSchema = require('../../models/TotalScoreSchema');
// const petAdmissionSchema = require('../../models/petAdmissionOwner');
// const petAdmissionAnimalSchema = require('../../models/petAdmissionAnimal');
// const ShelterSchema = require('../../models/shelterSchema');
// const validator = require('validator')
// const Razorpay = require("razorpay")
// const Cryptr = require('cryptr');
// const multer = require('multer');
// const xlsx = require('xlsx')


// const razorpay = new Razorpay({
//   key_id:'rzp_test_Hi9G47G9H24Gfc',
//   key_secret:'8sxalyvLvCf5mQs2qqp92TyE',
// })


// const cryptr = new Cryptr('myNameisAtlantis');
// // defining storage for image
// // const storage = multer.diskStorage({

// // //   // destination of file
// //   destination: function (req , file , cb){
// //       cb(null, '../../public/img');
// //   },

// //   filename: function (req, file , cb){
// //       cb(null , file.originalname);
// //   },
// // })

// // // upload parameters for multer
// // const upload = multer({
// //   storage:storage,
// //   limits:{
// //       fieldSize:1024*1024*3
// //   }
// // })


// // ------------------------------- LOgin and Registration page REST APIs are here 👇----------------------
// exports.getUserLogin = async(req,res,next)=>{
//   return res.status(200).render('login/login.pug');
// }

// exports.getHomePage = async(req,res,next)=>{
//   console.log("hello")
//   return res.status(200).render('home/home.pug');
// }

// exports.getChatPage = async(req,res,next)=>{
//   console.log("hello")
//   return res.status(200).render('chatbox/chatbox.pug');
// }

// exports.getpetInShelterPage = async(req,res,next)=>{
//   let dataPet = await petAdmissionAnimalSchema.find({})

//   console.log(dataPet)
//   return;
// }

// exports.addUserData = async(req,res,next)=>{

//   // if user already exists
//   const user = await UserSchema.findOne({email:req.body.email});

//   if(user) return res.status(400).send("User already exists");

//   // 1. validate
//   if(req.body.password!=req.body.confirmpassword){
//     return res.status(400).send("Password not matched")
//   }
//   // 2. password hash

//     let paswrdHash = await bcryptjs.hash(req.body.password,10)

//   //crypting password
//   const crytedPassword =  cryptr.encrypt(req.body.password)

//   const newData = {
//       "name":req.body.name,
//       "email": req.body.email,
//       "password": paswrdHash,
//       "dummy": crytedPassword,
//       "profileImg" : req.file.originalname
//   };

//   await UserSchema.create(newData,(err,result)=>{

//      if(err){
//           return res.status(401).json({
//               "type":"failure",
//               "msg": err
//           })
//      }
//      req.session.user = result;
//      res.status(200).redirect('/account/dashboard')
//     //  return res.status(201).json({
//     //   "type":"success",
//     //   "msg":result
//     // })

//   })
//   // 3. data base add kardo
//   // 4. render
//   return;

// }

// exports.userLogin =async(req,res,next)=>{
//   const data = await UserSchema.findOne({"email":req.body.email});

//   if(data){
//       const passwordResult = await bcryptjs.compare(req.body.password, data.password)
//       if(passwordResult){
//               req.session.user = data;
//               res.status(200).redirect('/account/dashboard')

//               // res.status(200).json({
//               //   "type":"success",
//               //   "msg":data
//               // })
//       }else{
//           return res.status(401).json({
//               "type":"failure",
//               "msg":"Plz enter correct password",
//           })
//       }
//   }else{
//       return res.status(401).json({
//           "type":"failure",
//           "msg":"user not found",
//       })
//   }

// }

// // -------------------------------------Dashboard page code is here 👇 -----------------------------------------
// exports.getDashboard = async(req,res,next)=>{
//     res.status(200).render('dashboard/dashboard.pug');
// }

// exports.getUserScore = async(req,res,next)=>{
//   let userPresent = await TotalScoreSchema.find({user : mongoose.Types.ObjectId(req.body.userId)})
//   return res.status(200).json({
//     "type":"success",
//     "highestscore" : userPresent.length?userPresent[0].highestscore : 0,
//     "totalattempt" : userPresent.length?userPresent[0].totalattempt : 0,
//   })
// }

// // ------------------------------------ Quiz page REST APIs here 👇 --------------------------------------------
// exports.getPetsInShelter = async(req,res,next)=>{
//   res.status(200).render('petInShelter/petInShelter.pug');
// }

// exports.getAdoptFromShelterPage = async(req,res,next)=>{
//   res.status(200).render('adoptionForm/adoptionForm.pug');
// }

// exports.getSendtoShelterPage = async(req,res,next)=>{
//   res.status(200).render('sendToShelter/sendToShelter.pug');
// }

// exports.setSendtoShelterOwnerPage = async(req,res,next)=>{


//   if(req.body.name || req.body.email || req.body.phone || req.body.address){
//         const newData = {
//           "owner":mongoose.Types.ObjectId(req.body.id),
//           "ownerDetails": {
//             "name":req.body.name,
//             "email": req.body.email,
//             "phone": req.body.phone,
//             "address": req.body.address,
//             "document": req.file.originalname
//           },
//         };

//         await petAdmissionSchema.create(newData,(err,result)=>{

//           if(err){
//                return res.status(401).json({
//                    "type":"failure",
//                    "msg": err
//                })
//           }
//           console.log(result)

//           res.status(200).redirect(`/account/petForm?ownerId=${result._id}`)

//        })

//   }else{
//     return res.status(201).json({
//       "type" : "failure",
//       "message" : "You have not provided correct data"
//     })
//   }
// }


// exports.setSendtoShelterAnimalPage = async(req,res,next)=>{


//   if(req.body.type || req.body.gender || req.body.vaccination){
//         const newData = {
//             "ownerId" : mongoose.Types.ObjectId(req.body.ownerId),
//             "userId":mongoose.Types.ObjectId(req.body.userId),
//             "name":req.body.name,
//             "common_name":req.body.common_name,
//             "gender": req.body.gender,
//             "type": req.body.type,
//             "vaccination": req.body.vaccination,
//             "petImage": req.file.originalname,
//             "age": parseInt(req.body.age)
//         };

//         await petAdmissionAnimalSchema.create(newData,(err,result)=>{

//           if(err){
//                return res.status(401).json({
//                    "type":"failure",
//                    "msg": err
//                })
//           }
//           res.status(200).redirect(`/account/successForm?petDataId=${result._id}`)

//        })

//   }else{
//     return res.status(201).json({
//       "type" : "failure",
//       "message" : "You have not provided correct data"
//     })
//   }
// }

// exports.getpetFormPage = async(req,res,next)=>{
//   res.status(200).render('sendToShelter/petForm.pug',{ownerId:req.query.ownerId});
// }

// exports.getsuccessFormPage = async(req,res,next)=>{
//   res.status(200).render('sendToShelter/successForm.pug',{addmissionId:req.query.petDataId});
// }

// exports.getdonationPage = async(req,res,next)=>{
//   res.status(200).render('donation/donation.pug');
// }

// exports.getRazorpayOrder = async(req,res,next)=>{
//   let options ={
//     amount: 50000,
//     currency: "INR",
//    };

// razorpay.orders.create(options, function(err,order){
//     console.log(order)
//     res.json(order)
// })
// }


// exports.getRazorpayOrderIsComplete = async(req,res,next)=>{
//   razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocumnet)=>{
//     if(paymentDocumnet.status == 'captured'){
//         res.send('Payment Successfull')
//     }
//     else{
//         res.redirect('/account/dashboard')
//     }
// })
// }

// exports.getAdmissionData = async(req,res,next)=>{
//   let admData = await petAdmissionAnimalSchema.findById(req.body.id).populate({
//     path: "ownerId",
//   })

//   const admissionData = {
//     "name":admData.ownerId.ownerDetails.name,
//     "email":admData.ownerId.ownerDetails.email,
//     "phone":admData.ownerId.ownerDetails.phone,
//     "address":admData.ownerId.ownerDetails.address,
//     "gender":admData.gender,
//     "common_name":admData.common_name,
//     "type":admData.type,
//     "vaccination":admData.vaccination,
//   }
//   console.log(admData);
//   return res.status(200).json({
//     "type":"success",
//     "message":admissionData
//   })
// }

// exports.getemergencyPage = async(req,res,next)=>{
//   res.status(200).render('emergency/emergency.pug');
// }


// exports.getAddShelterPage = async(req,res,next)=>{
//   res.status(200).render('addShelter/addShelter.pug');

// }
// exports.setAddShelterData = async(req,res,next)=>{
//   console.log(req.body);
//     const newData = {
//       "name": req.body.name,
//       "address": req.body.address,
//       "city_name": req.body.city_name,
//       "phone": req.body.phone,
//       "total_pets": req.body.total_pets,
//       "total_employee": req.body.total_employee,
//     }

//     await ShelterSchema.create(newData,(err,result)=>{

//       if(err){
//            return res.status(401).json({
//                "type":"failure",
//                "msg": err
//            })
//       }
//       res.status(200).redirect(`/account/addShelter`)

//    })

// }

// exports.getNearbyShelterData = async(req,res,next)=>{
//   console.log(req.body);
//   const shelterData = await ShelterSchema.find({city_name : req.body.city_name})
//   return res.status(200).json({
//     "type":"success",
//     "message":shelterData
//   })
// }
// exports.provideQuizQuestion = async(req,res,next)=>{
//      var Qno = req.query.number;

//      var wb = xlsx.readFile('excelSheet/Book1.xlsx');

//      var ws = wb.Sheets["QuizQuestion"];

//      var data = xlsx.utils.sheet_to_json(ws);

//      var QuesData = data.find(data =>{
//      if(data.SrNo == Qno.toString())  return data;
//      })

//      res.status(200).json({
//       type:"success",
//       data :  {
//         "SrNo": QuesData.SrNo,
//         "Question": QuesData.Question,
//         "CorrectAnswer1" : QuesData.CorrectAnswer1,
//         "WrongAnswer1" : QuesData.WrongAnswer1,
//         "WrongAnswer2" : QuesData.WrongAnswer2,
//         "WrongAnswer3" : QuesData.WrongAnswer3,
//         "Solution" : QuesData.Solution
//        }
//      })
// }

// exports.submitResult = async(req,res,next)=>{
//   let userPresent = await TotalScoreSchema.find({user : mongoose.Types.ObjectId(req.body.userId)})

//   if(!userPresent.length){
//     await TotalScoreSchema.create({
//       highestscore:parseInt(req.body.currentscore),
//       currentscore:parseInt(req.body.currentscore),
//       totalattempt : 1,
//       user : mongoose.Types.ObjectId(req.body.userId)
//     })
//   }else{
//     await TotalScoreSchema.findOneAndUpdate({user : mongoose.Types.ObjectId(req.body.userId)},{
//       highestscore:Math.max(userPresent[0].highestscore,parseInt(req.body.currentscore)),
//       currentscore:parseInt(req.body.currentscore),
//       totalattempt : (parseInt(userPresent[0].totalattempt)+1),
//     })
//   }

//   res.status(200).json({
//     type:"success"
//   })
// }


// // -------------------------------- logout code is here 👇 ----------------------------------------------------
// exports.logOut = async(req,res,next)=>{
//   req.session.user = null;

//   res.status(200).redirect('/account/login');

// }


var Stations =  [
  {
    "name" : "Panvel",
    "trains" : [
      {
        "time": "04.33",
        "train_number" : "1"
      },
      {
        "time" : "04:49",
        "train_number" : "2"
      }
    ],
  },
  {
    "name" : "Khandeshwar",
    "trains" : [
      {
        "time": "04.38",
        "train_number" : "1"
      },
      {
        "time" : "04:54",
        "train_number" : "2"
      }
    ],
  },
  {
    "name" : "Manasarovar",
    "trains" : [
      {
        "time": "04.41",
        "train_number" : "1"
      },
      {
        "time" : "04:57",
        "train_number" : "2"
      }
    ],
  },
  {
    "name" : "Kharghar",
    "trains" : [
      {
        "time": "04.44",
        "train_number" : "1"
      },
      {
        "time" : "05:00",
        "train_number" : "2"
      }
    ],
  },
  {
    "name" : "Belapur CBD",
    "trains" : [
      {
        "time": "04:48",
        "train_number" : "1"
      },
      {
        "time" : "05:04",
        "train_number" : "2"
      },
      {
        "time" : "04:53",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Seawood Darave",
    "trains" : [
      {
        "time": "04:52",
        "train_number" : "1"
      },
      {
        "time" : "05:08",
        "train_number" : "2"
      },
      {
        "time" : "04:57",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Nerul",
    "trains" : [
      {
        "time": "04:56",
        "train_number" : "1"
      },
      {
        "time" : "05:11",
        "train_number" : "2"
      },
      {
        "time" : "05:00",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Juinagar",
    "trains" : [
      {
        "time": "05:00",
        "train_number" : "1"
      },
      {
        "time" : "05:14",
        "train_number" : "2"
      },
      {
        "time" : "05:03",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Sanpada",
    "trains" : [
      {
        "time" : "05:17",
        "train_number" : "2"
      },
      {
        "time" : "05:06",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Vashi",
    "trains" : [
      {
        "time" : "05:19",
        "train_number" : "2"
      },
      {
        "time" : "05:08",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Mankhurd",
    "trains" : [
      {
        "time" : "05:27",
        "train_number" : "2"
      },
      {
        "time" : "05:16",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Govandi",
    "trains" : [
      {
        "time" : "05:30",
        "train_number" : "2"
      },
      {
        "time" : "05:19",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Chembur",
    "trains" : [
      {
        "time" : "05:32",
        "train_number" : "2"
      },
      {
        "time" : "05:21",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Tilaknagar",
    "trains" : [
      {
        "time" : "05:35",
        "train_number" : "2"
      },
      {
        "time" : "05:24",
        "train_number" : "3"
      }
    ],
  },
  {
    "name" : "Kurla",
    "trains" : [
      {
        "time" : "05:38",
        "train_number" : "2"
      },
      {
        "time" : "05:27",
        "train_number" : "3"
      }
    ],
  },
]

var Train1 = {
    "start_time": "04:33",
    "end_time": "05:25",
    "start_station": "Panvel",
    "end_station": "Thane",
    "path": [
      {
        "station": "panvel",
        "time": "04:33",
        "platform": "1"
      },
      {
        "station": "khandeshwar",
        "time": "04:38",
        "platform": "1"
      },
      {
        "station": "manasarovar",
        "time": "04:41",
        "platform": "1"
      },
      {
        "station": "kharghar",
        "time": "04:44",
        "platform": "1"
      },
      {
        "station": "belapur",
        "time": "04:48",
        "platform": "1"
      },
      {
        "station": "seawood darave",
        "time": "04:52",
        "platform": "1"
      },
      {
        "station": "nerul",
        "time": "04:56",
        "platform": "1"
      },
      {
        "station": "juinagar",
        "time": "05:00",
        "platform": "1"
      }
    ],
    "line": "harbour",
    "type": "slow"
  }

var Train2 =  {
  "start_time": "04:49",
  "end_time": "06:08",
  "start_station": "panvel",
  "end_station": "csmt",
  "path": [
    {
      "station": "panvel",
      "time": "04:49",
      "platform": "1"
    },
    {
      "station": "khandeshwar",
      "time": "04:54",
      "platform": "1"
    },
    {
      "station": "manasarovar",
      "time": "04:57",
      "platform": "1"
    },
    {
      "station": "kharghar",
      "time": "05:00",
      "platform": "1"
    },
    {
      "station": "belapur",
      "time": "05:04",
      "platform": "1"
    },
    {
      "station": "seawood darave",
      "time": "05:08",
      "platform": "1"
    },
    {
      "station": "nerul",
      "time": "05:11",
      "platform": "1"
    },
    {
      "station": "juinagar",
      "time": "05:14",
      "platform": "1"
    },
    {
      "station": "sanpada",
      "time": "05:17",
      "platform": "1"
    },
    {
      "station": "vashi",
      "time": "05:19",
      "platform": "1"
    },
    {
      "station": "mankhurd",
      "time": "05:27",
      "platform": "1"
    },
    {
      "station": "govandi",
      "time": "05:30",
      "platform": "1"
    },
    {
      "station": "chembur",
      "time": "05:32",
      "platform": "1"
    },
    {
      "station": "tilaknagar",
      "time": "05:35",
      "platform": "1"
    },
    {
      "station": "kurla",
      "time": "05:38",
      "platform": "1"
    }
  ],
  "line": "harbour",
  "type": "slow"
}

var Train3 =  {
  "start_time": "04:53",
  "end_time": "05:56",
  "start_station": "Belapur CBD",
  "end_station": "CSMT",
  "path": [
    {
      "station": "Belapur CBD",
      "time": "04:53",
      "platform": "1"
    },
    {
      "station": "seawood darave",
      "time": "04:57",
      "platform": "1"
    },
    {
      "station": "nerul",
      "time": "05:00",
      "platform": "1"
    },
    {
      "station": "juinagar",
      "time": "05:03",
      "platform": "1"
    },
    {
      "station": "sanpada",
      "time": "05:06",
      "platform": "1"
    },
    {
      "station": "vashi",
      "time": "05:08",
      "platform": "1"
    },
    {
      "station": "mankhurd",
      "time": "05:16",
      "platform": "1"
    },
    {
      "station": "govandi",
      "time": "05:19",
      "platform": "1"
    },
    {
      "station": "chembur",
      "time": "05:21",
      "platform": "1"
    },
    {
      "station": "tilaknagar",
      "time": "05:24",
      "platform": "1"
    },
    {
      "station": "kurla",
      "time": "05:27",
      "platform": "1"
    }
  ],
  "line": "harbour",
  "type": "slow"
}


exports.provideMaxRoute = async (req, res, next) => {
  var from_station = "Khandeshwar";
  var to_station = "Kurla";
  var station_reach_time = "04:35";


  var harbour_stations_till_csmt = ["Panvel", "Khandeshwar", "Manasarovar", "Kharghar", "Belapur CBD", "Seawood Darave", "Nerul", "Juinagar", "Sanpada", "Vashi", "Mankhurd", "Govandi", "Chembur", "Tilaknagar", "Kurla", "Chunabhatti", "GTB Nagar", "Vadala Road", "Sewri", "Cotton Green", "Reay Road", "Dockyard Road", "Sandhurst Road", "Masjid", "CSMT"];

  var from_station_present = harbour_stations_till_csmt.find(ele => ele === from_station);
  var to_station_present = harbour_stations_till_csmt.find(ele => ele === to_station);

  // console.log(from_station_present);
  // console.log(to_station_present);

  if (from_station_present && to_station_present) {
    const value = await Best_Route(from_station_present, to_station_present, station_reach_time);
    return res.status(200).json({
      type: value
    })
  }


}


const Best_Route = async (from_station_present, to_station_present, station_reach_time) => {
  var next_train = findNextTrain(from_station_present, station_reach_time);

  if (next_train.end_station == "Thane") {
    var local_start_stations = ["Panvel", "Belapur CBD", "Nerul"];

    // time if catching train of thane
    const going_till_belapur_then_hop = await findTimeIfHopAtBelapur(next_train);

    // or time if we leave the thane train and catching next csmt train
    const taking_next_train = await findTimeIfNextTrain(next_train.path[1].time)

    // compare both time then provide best solution
    if(catching_till_juinagar_then_change >= catching_next_train){

    }

  }
  else {
    return next_train;
  }

}


const findNextTrain = async (from_station_present, station_reach_time) => {

  // yeha station ke database me jaao and next train find karlo time ke help se
  const next_train_at_provided_station = Train1


  return next_train_at_provided_station;


}



const findNextLocalStartStation = async (from_station) => {

  var harbour_stations_till_csmt = ["Panvel", "Khandeshwar", "Manasarovar", "Kharghar", "Belapur CBD", "Seawood Darave", "Nerul", "Juinagar", "Sanpada", "Vashi", "Mankhurd", "Govandi", "Chembur", "Tilaknagar", "Kurla", "Chunabhatti", "GTB Nagar", "Vadala Road", "Sewri", "Cotton Green", "Reay Road", "Dockyard Road", "Sandhurst Road", "Masjid", "CSMT"];

  var local_start_stations = ["Panvel", "Belapur CBD", "Nerul"];

  var from_station_index = harbour_stations_till_csmt.findIndex(ele => ele == from_station)

  console.log(from_station_index);

  var next_local_start_from_present_station;

  for (let i = from_station_index; i < harbour_stations_till_csmt.length; i++) {
    if (harbour_stations_till_csmt[i] == "Panvel" || harbour_stations_till_csmt[i] == "Belapur CBD") {
      next_local_start_from_present_station = harbour_stations_till_csmt[i];
      break;
    }
  }

  const nextStation = next_local_start_from_present_station;

  // now we got the next hoping station , now lets see the time when our train will reach at this station



}







