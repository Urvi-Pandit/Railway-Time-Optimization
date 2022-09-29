import React from 'react'
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
  
const RouteForm = () => {
  return (
    <form>
 <div style={{marginTop:100}}>
         <Card className="w-96 routecard" style={{width:1300,marginLeft:100,marginRight:100,marginTop:100,paddingLeft:80}}>
      
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          Search for the Most Optimal Train Route
        </Typography>
        <Typography>
  
        </Typography>
        <div className="flex w-full items-end gap-4" >
        <div className="w-72" >
        <Select variant="standard" label="Select Passengers" style={{textDecoration:'none'}}>
        <Option>1</Option>
        <Option>2</Option>
        <Option>3</Option>
        <Option>4</Option>
        <Option>5</Option>
      </Select>
    </div>
        </div>
        <div className="flex w-full items-end gap-4">
        <div className="w-72">
      <Input label="Source" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}}/>
         </div>
         <div className="w-72">
      <Input label="Destination" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}}/>
    </div>
    <div className="w-72">
      <Input label="Time" icon={<i className="fas fa-heart" />} style={{backgroundColor:'#ECEFF1'}} type="time" value="13:30"/>
    </div>
    
    <Button variant="gradient" color='purple' style={{marginLeft:40}} type="submit">Search</Button>
        </div>
       
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <div>
          <Typography variant="h5" className="mb-2">
          <Switch color="purple" defaultChecked  className="mr-10"/>&nbsp;Find your Accomodation
        </Typography>
        </div>
     
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Mumbai, India
        </Typography>
        
      </CardFooter>
    </Card>

    </div>
    </form>
   
  )
}

export default RouteForm