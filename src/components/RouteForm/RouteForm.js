import React from 'react'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
    Select,
    Option
  } from "@material-tailwind/react";
  import { Input,Switch } from "@material-tailwind/react";
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';


const RouteForm = () => {

const [formData, setFormData] = useState({
    source: "",
    destination: "",
    time: "",
    passengers: 1,
});


const navigate  =  useNavigate();
const handleChange = (event) => {
  setFormData((prevState) => {
      return {
          ...prevState,
          [event.target.name]: event.target.value,
      };
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  // navigate('/showtrains',{state:{source:formData.source,destination:formData.destination,time:formData.time}})
  console.log(formData);

  axios.post("https://railway-time-optimisation.herokuapp.com/getTimeSavingRoute",{
          from : formData.source,
          to: formData.destination,
          time: formData.time,
      })
      .then(function (response) {
          console.log(response.data);
          console.log(response.data.type)
          if(response.data.type == "failure"){
            alert("No train found -- server error --> data not found in database");
            return;
          }
          navigate('/showtrains',{state:{source:formData.source,destination:formData.destination,time:formData.time,data:response.data}})
      })
      .catch(function (error) {
          console.log(error);
      });

};

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center'}}>
 <div className='routeformcontainer'>
 {/* style={{width:1300,marginLeft:100,marginRight:100,paddingLeft:80}} */}
         <Card className="routecard" >

      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          Search for the Most Optimal Train Route in Harbour line
        </Typography>


        <div className="routeformcard">
        <div className="inputfields">
      {/* <Input label="Source" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}}  id="source" name="source"
      value={formData.source} onChange={handleChange} required type='text'/> */}

<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{backgroundColor:'#ECEFF1'}}  id="source" name="source"
      value={formData.source} onChange={handleChange} required type='text'>
<option selected>Choose a source station</option>
<option value="Panvel">Panvel</option>
  <option value="Khandeshwar">Khandeshwar</option>
  <option value="Manasarover">Manasarover</option>
  <option value="Kharghar">Kharghar</option>
  <option value="Belapur CBD">Belapur CBD</option>
  <option value="Seawood Darave">Seawood Darave</option>
  <option value="Nerul">Nerul</option>
  <option value="Juinagar">Juinagar</option>
  <option value="Sanpada">Sanpada</option>
  <option value="Vashi">Vashi</option>
  <option value="Mankhurd">Mankhurd</option>
  <option value="Govandi">Govandi</option>
  <option value="Chembur">Chembur</option>
  <option value="Tilaknagar">Tilaknagar</option>
  <option value="Kurla">Kurla</option>
</select>
</div>

         <div className="inputfields">
      {/* <Input label="Destination" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}} id="destination" name="destination"
      value={formData.destination} onChange={handleChange} required type='text'/> */}

      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      style={{backgroundColor:'#ECEFF1'}} id="destination" name="destination"
      value={formData.destination} onChange={handleChange} required type='text'>
  <option selected>Choose a destination station</option>
  <option value="Panvel">Panvel</option>
  <option value="Khandeshwar">Khandeshwar</option>
  <option value="Manasarover">Manasarover</option>
  <option value="Kharghar">Kharghar</option>
  <option value="Belapur CBD">Belapur CBD</option>
  <option value="Seawood Darave">Seawood Darave</option>
  <option value="Nerul">Nerul</option>
  <option value="Juinagar">Juinagar</option>
  <option value="Sanpada">Sanpada</option>
  <option value="Vashi">Vashi</option>
  <option value="Mankhurd">Mankhurd</option>
  <option value="Govandi">Govandi</option>
  <option value="Chembur">Chembur</option>
  <option value="Tilaknagar">Tilaknagar</option>
  <option value="Kurla">Kurla</option>
</select>
    </div>
    <div className="inputfields">

      <Input label="Time" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}} type="time" id="time" name="time"
      onChange={handleChange}/>
    </div>

    <Button variant="gradient" color='purple' style={{margin:10,width:200,height:'60%'}} type="submit">Search</Button>
        </div>

      </CardBody>

    </Card>

    </div>
    </form>

  )
}

export default RouteForm