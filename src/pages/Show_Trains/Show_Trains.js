import React from 'react'

import { useState, Fragment } from "react";
import {
     Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import {Button,Input,Checkbox} from  '@material-tailwind/react'
import Navbar from "../../components/Navbar/Navbar";
import RouteForm from '../../components/RouteForm/RouteForm';
import './Show_Trains.css'
import { Chrono } from "react-chrono";
const Show_Trains = () => {
    const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const items = [{
    title: "Belapur",
    cardTitle: "Belapur",
    url: "http://www.history.com",
    cardSubtitle:"Arrival Time:  ",
    cardDetailedText: "Platform No:",
   
  }, 
  {
    title: "Juinagar",
    cardTitle: "Juinagar",
    url: "http://www.history.com",
    cardSubtitle:"Arrival Time:",
    cardDetailedText: "Platform No:",
  
  },
  {
    title: "Vashi",
    cardTitle: "Vashi",
    url: "http://www.history.com",
    cardSubtitle:"Arrival Time:",
    cardDetailedText: "Platform No:",
   
  }
];
  return (
    <div>

<div className='Home_Banner'style={{paddingTop:10}}>
      <Navbar />
      <div style={{marginTop:15}}>    </div>   
       <RouteForm />
       </div>
       <div className="trains_acc" style={{width:1000,marginTop:100,display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:250,marginRight:250}}>
      
      <Fragment >
     <Accordion open={open === 1} animate={customAnimation} >
       <AccordionHeader onClick={() => handleOpen(1)}>
        <div className='gridText'>
        <div className="w-72 " >
      <Input label="Train: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="Time: 07:50" disabled />
    </div>
    <div className="w-72">
      <Input label="From: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="To: Vashi" disabled />
    </div>
        </div>
  
       </AccordionHeader>
       <AccordionBody>
       <div style={{ width: "500px", height: "400px",marginLeft:200 }}>
        <Chrono items={items} />
      </div>
       </AccordionBody>
     </Accordion>
     <Accordion open={open === 2} animate={customAnimation}>
       <AccordionHeader onClick={() => handleOpen(2)}>
       <div className='gridText'>
        <div className="w-72 " >
      <Input label="Train: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="Time: 07:50" disabled />
    </div>
    <div className="w-72">
      <Input label="From: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="To: Vashi" disabled />
    </div>
        </div>
       </AccordionHeader>
       <AccordionBody>
       <div style={{ width: "500px", height: "400px",marginLeft:200 }}>
        <Chrono items={items} />
      </div>
       </AccordionBody>
     </Accordion>
     <Accordion open={open === 3} animate={customAnimation}>
       <AccordionHeader onClick={() => handleOpen(3)}>
       <div className='gridText'>
        <div className="w-72 " >
      <Input label="Train: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="Time: 07:50" disabled />
    </div>
    <div className="w-72">
      <Input label="From: Belapur" disabled />
    </div>
    <div className="w-72">
      <Input label="To: Vashi" disabled />
    </div>
        </div>
       </AccordionHeader>
       <AccordionBody>
       <div style={{ width: "500px", height: "400px",marginLeft:200 }}>
        <Chrono items={items} />
      </div>
       </AccordionBody>
     </Accordion>
   </Fragment>
     
      
     
      </div>
    </div>

  )
}

export default Show_Trains