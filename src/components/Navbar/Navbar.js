import React from 'react'
import './Navbar.css'
import project_logo from '../../media/project_logo.svg'
import { Typography } from '@material-tailwind/react'
import { Outlet, Link } from "react-router-dom";
const Navbar = () => {
  return (
   <>
        <div className='Navbar_Container'>
            <div className='left_Container'>
           
            <img src={project_logo}  style={{height:40}}/>
             
            
            <a className='Navbar_Content' style={{cursor:'pointer'}}>
              
              <Typography variant="h5" color="gray" className="mb-2">
        Mumbai Local
        </Typography>
            </a>
            <a className='Navbar_Content' style={{cursor:'pointer'}}>
            <Typography variant="h5" color="gray" className="mb-2">
        Trains
        </Typography>
            </a>
            <a className='Navbar_Content' style={{cursor:'pointer'}}>
            <Typography variant="h5" color="gray" className="mb-2">
        Your Bookings
        </Typography>
            </a>
            </div>

           <div className='right_Container'>
            <a className='Navbar_Content' style={{cursor:'pointer'}}>
            <Typography variant="h5" color="gray" className="mb-2">
        Sign In
        </Typography>
            </a>
            
            {/* <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/signin"> */}


            <Typography variant="h5" color="gray" className="mb-2">
        Create an account
        </Typography>
          
            {/* </Link> */}
           </div>
           
        </div>
      
        <Outlet />
   </>
  )
}

export default Navbar