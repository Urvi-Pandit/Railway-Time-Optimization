import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
  import local_Train from '../../media/localtrain.jpg';
  import CSMT from '../../media/csmt.jpg';
  import LifeLine from '../../media/lifeline.jpg';
const InfoCards = () => {
  return (
    <div style={{marginTop:20}} className='info_cards_container'>

<Card className="infocards">
      <CardHeader floated={false} >
        <img src={local_Train}style={{height:160,width:'100%'}}  alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="gray" className="mb-2">
          Train Schedule
        </Typography>
   
      </CardBody>
      
    </Card>

    <Card className=" infocards ">
      <CardHeader floated={false} >
        <img src={CSMT} alt="profile-picture" style={{height:160,width:'100%'}} />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="gray" className="mb-2">
          Find Places
        </Typography>
        
      </CardBody>
      
    </Card>
    <Card className="infocards ">
      <CardHeader floated={false} >
        <img src={LifeLine} alt="profile-picture" style={{height:160,width:'100%'}}/>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="gray" className="mb-2">
          Lifeline
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
        
        </Typography>
      </CardBody>
      
    </Card>
    </div>
  )
}

export default InfoCards