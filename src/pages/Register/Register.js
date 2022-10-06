import React from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import {Button,Input,Checkbox} from  '@material-tailwind/react'
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
 import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    Name:"",
    Email: "",
    Password: "",
   

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
  navigate('/',{})
  console.log(formData);

  // axios
  //     .post("http://127.0.0.1:5000/weather-predict", {
  //         tempr: Number(formData.tempr),
  //         air_pressure: Number(formData.air_pressure),
  //         wind_speed: Number(formData.wind_speed),
  //         wind_direction: Number(formData.wind_direction),
  //         relative_humidity: Number(formData.relative_humidity),
  //     })
  //     .then(function (response) {
  //         setOutput(response.data.data);
  //         console.log(output);
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     });
  setFormData({
    Name:"",
    Email: "",
    Password: "",
  });
};
  return (
    <>
    <div className='Home_Banner'style={{paddingTop:10}}>
    <Navbar />
    <div style={{marginTop:15}}>
        <Typography style={{marginLeft:"15%",fontSize:40}} variant="h2" color="gray" className="mb-2">
      Travel that moves you
      </Typography>
      <Typography style={{marginLeft:"15%",fontSize:20}} variant="h5" color="gray" className="mb-2">
      Book Train Tickets
      </Typography>
        </div>

        <div style={{display:'flex',justifyContent:'center'}}>
    <form onSubmit={handleSubmit}>
      <Card className="w-96 m-10" >
      <CardHeader
        variant="gradient"
        color="purple"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Register
        </Typography>
      </CardHeader>
      
      <CardBody className="flex flex-col gap-4">
      <Input label="Name" size="lg"   id="Name" name="Name"
      value={formData.Name} onChange={handleChange} required/>
        <Input label="Email" size="lg" id="Email" name="Email"
      value={formData.Email} onChange={handleChange} required/>
        <Input label="Password" size="lg"  id="Password" name="Password"
      value={formData.Password} onChange={handleChange} required type="password"/>
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="purple"  type="submit" fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/signin">
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="purple"
            className="ml-1 font-bold"
           
          >
            Sign In
          </Typography> </Link>
        </Typography>
      </CardFooter>
    </Card>
      </form>
    </div>
    </div>
    
   
   
    </>
  )
}

export default Register