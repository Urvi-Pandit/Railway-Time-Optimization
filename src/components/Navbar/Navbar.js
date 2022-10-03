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
             
            
            <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
                <Typography variant="h5" color="gray" className="mb-2">
               Mumbai Local
                </Typography>

            </Link>

            <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
                <Typography variant="h5" color="gray" className="mb-2">
                Trains
                </Typography>

            </Link>
           
            <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
                <Typography variant="h5" color="gray" className="mb-2">
                Your bookings
                </Typography>

            </Link>
            </div>
    
           <div className='right_Container'>
           <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/signin">


            <Typography variant="h5" color="gray" className="mb-2">
        Sign In
        </Typography>
          
            </Link>
            
            <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/register">


            <Typography variant="h5" color="gray" className="mb-2">
        Create an account
        </Typography>
          
            </Link>
           </div>
           
        </div>
      
        <Outlet />
   </>
  )
}

export default Navbar