import React from 'react'

import { useState, Fragment, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Button, Input, Checkbox } from '@material-tailwind/react'
import Navbar from "../../components/Navbar/Navbar";
import RouteForm from '../../components/RouteForm/RouteForm';
import './Show_Trains.css'
import { Chrono } from "react-chrono";
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/spinner/spinner';
const Show_Trains = () => {

  const location = useLocation();
  console.log(location.state.data.train1.first_train)
  const [open, setOpen] = useState(0);
  const [TrainData, setlocation] = useState(location.state);
  const [Train1, settrain1] = useState({});
  const [Train2, settrain2] = useState({});
  const [items, setitem] = useState([]);
  const [item2, setitem2] = useState([]);
  const [loading,setloading] = useState(true)
  const [Journey1startTime,setJourney1startTime] = useState("")
  const [Journey1endTime,setJourney1endTime] = useState("")
  const [Journey2endTime,setJourney2endTime] = useState("")

  


  useEffect(() => {
    if (location.state.data.train1.first_train) {

      settrain2(location.state.data.train1.second_train)
      var newArr = [];
      location.state.data.train1.second_train.path.map(ele => {
        if(location.state.destination.toLowerCase()==ele.station){
          setJourney2endTime(ele.time);
        }

        var newObj = {
          title: ele.station,
          cardTitle: "Station: " + ele.station,
          url: "http://www.history.com",
          cardSubtitle: "Arrival Time:  " + ele.time,
          cardDetailedText: "Platform No:" + ele.platform,
        }
        newArr.push(newObj);
      })
      setitem2(newArr);

      settrain1(location.state.data.train1.first_train)
       newArr = [];
      location.state.data.train1.first_train.path.map(ele => {
        if(location.state.source.toLowerCase()==ele.station){
          setJourney1startTime(ele.time)
        }else if(location.state.data.train1.second_train.start_station == ele.station){
          setJourney1endTime(ele.time)
        }
        var newObj = {
          title: ele.station,
          cardTitle: "Station: " + ele.station,
          url: "http://www.history.com",
          cardSubtitle: "Arrival Time:  " + ele.time,
          cardDetailedText: "Platform No:" + ele.platform,
        }
        newArr.push(newObj);
      })
      setitem(newArr);


    } else {
      settrain1(location.state.data.train1)
      newArr = [];
      location.state.data.train1.path.map(ele => {
        if(location.state.source.toLowerCase()==ele.station){
          setJourney1startTime(ele.time)
        }else if(location.state.destination.toLowerCase() == ele.station){
          setJourney1endTime(ele.time)
        }
        var newObj = {
          title: ele.station,
          cardTitle: "Station: " + ele.station,
          url: "http://www.history.com",
          cardSubtitle: "Arrival Time:  " + ele.time,
          cardDetailedText: "Platform No:" + ele.platform,
        }
        newArr.push(newObj);
      })
      setitem(newArr);
      settrain2({"start_station":location.state.destination})

    }
    setloading(false)

  }, [location]);





  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };


  return (

    loading?<LoadingSpinner/>:
    <div>

      <div className='Home_Banner' style={{ paddingTop: 10 }}>
        {/* <Navbar /> */}
        <div style={{ marginTop: 35 }}>    </div>
        <RouteForm />
      </div>
      <div className="trains_acc" style={{ width: 1000, marginTop: 100, display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 250, marginRight: 250 }}>

        <Fragment >
          <Accordion open={open === 1} animate={customAnimation} >
            <AccordionHeader onClick={() => handleOpen(1)}>
              <div className='gridText'>
                <div className="w-72 " >
                  <Input label={`From: ${Train1.start_station}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`To: ${(Train2.start_station)}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`Journey Start timing: ${Journey1startTime}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`Journey End timing: ${Journey1endTime}`} disabled />
                </div>
              </div>

            </AccordionHeader>
            <AccordionBody>
              <div style={{ width: "500px", height: "400px", marginLeft: 200 }}>
                <Chrono items={items} />
              </div>
            </AccordionBody>
          </Accordion>

          {item2.length==0?<div></div>:
          <Accordion open={open === 2} animate={customAnimation}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              <div className='gridText'>
                <div className="w-72 " >
                  <Input label={`From: ${Train2.start_station}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`To : ${location.state.destination}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`Journey Start timing: ${Train2.start_time}`} disabled />
                </div>
                <div className="w-72">
                  <Input label={`Journey End timing: ${Journey2endTime}`} disabled />
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div style={{ width: "500px", height: "400px", marginLeft: 200 }}>
                <Chrono items={item2} />
              </div>
            </AccordionBody>
          </Accordion>
        }
        </Fragment>



      </div>
    </div>

      // <div>Show trains</div>

  )
}

export default Show_Trains