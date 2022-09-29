import React from 'react'
import InfoCards from '../../components/InfoCards/InfoCards';
import Navbar from '../../components/Navbar/Navbar'
import RouteForm from '../../components/RouteForm/RouteForm';
import { Typography } from '@material-tailwind/react';
import home_page_banner from '../../media/home_page_banner.jpg'
import local_Train from '../../media/localtrain.jpg';


import './Home.css'
const Home = () => {
  return (
    <>
    
    <div className='Home_Container'>
        <div className='Home_Banner'style={{paddingTop:10}}>
          <Navbar />
          {/* <h1 style={{marginLeft:"20%",fontSize:40}}>Travel that moves you</h1>
          <h3 style={{marginLeft:"20%",fontSize:30,marginTop:10}}>Book train tickets</h3> */}
          <div style={{marginTop:15}}>
          <Typography style={{marginLeft:"15%",fontSize:40}} variant="h2" color="gray" className="mb-2">
        Travel that moves you
        </Typography>
        <Typography style={{marginLeft:"15%",fontSize:20}} variant="h5" color="gray" className="mb-2">
        Book Train Tickets
        </Typography>
          </div>
         
          <RouteForm />
        </div>
        
    </div>
    <InfoCards style={{marginTop:700}}/>
    
    </>
    
  )
}

export default Home