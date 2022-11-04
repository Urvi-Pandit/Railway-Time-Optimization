// import React from 'react'
// import './Navbar.css'
import project_logo from '../../media/project_logo.svg'
// import { Typography } from '@material-tailwind/react'
import { Outlet, Link } from "react-router-dom";
// const Navbar = () => {
//   return (
//    <>
//         <div className='Navbar_Container'>
//             <div className='left_Container'>
           
            // <img src={project_logo}  style={{height:40}}/>
             
            
            // <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
            //     <Typography variant="h5" color="gray" className="mb-2">
            //    Mumbai Local
            //     </Typography>

            // </Link>

            // <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
            //     <Typography variant="h5" color="gray" className="mb-2">
            //     Trains
            //     </Typography>

            // </Link>
           
            // <Link className='Navbar_Content' style={{cursor:'pointer'}} to="*">
            //     <Typography variant="h5" color="gray" className="mb-2">
            //     Your bookings
            //     </Typography>

            // </Link>
//             </div>
    
//            <div className='right_Container'>
        //    <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/signin">


        //     <Typography variant="h5" color="gray" className="mb-2">
        // Sign In
        // </Typography>
          
        //     </Link>
            
        //     <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/register">


        //     <Typography variant="h5" color="gray" className="mb-2">
        // Create an account
        // </Typography>
          
        //     </Link>
//            </div>
           
//         </div>
      
//         <Outlet />
//    </>
//   )
// }

// export default Navbar

import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography> */}
                 
             
            
            
 
             {/* <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
                 <Typography variant="h5" color="gray" className="mb-2">
                 Trains
                 </Typography>
 
             </Link>
            
             <Link className='Navbar_Content' style={{cursor:'pointer'}} to="*">
                 <Typography variant="h5" color="gray" className="mb-2">
                 Your bookings
                 </Typography>
 
             </Link>
             <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/signin">


<Typography variant="h5" color="gray" className="mb-2">
Sign In
</Typography>

</Link>

<Link className='Navbar_Content' style={{cursor:'pointer'}} to="/register">


<Typography variant="h5" color="gray" className="mb-2">
Create an account
</Typography>

</Link> */}
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography> */}
      
    
    </ul>
  );
 
  return (
    <Navbar style={{backgroundColor:'transparent'}} className="mx-auto max-w-screen-2xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      <img src={project_logo}  style={{height:40}}/>
   
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span>
            
          <Link className='Navbar_Content' style={{cursor:'pointer'}} to="/">
                 <Typography variant="h5" color="gray" className="mb-2">
                Mumbai Local
                 </Typography>
 
             </Link>
          </span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {/* <Button variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Buy Now</span>
        </Button> */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Buy Now</span>
        </Button> */}
      </MobileNav>
    </Navbar>
  );
}