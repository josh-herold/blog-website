import { useState } from 'react'
import './Navbar.css'
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';



const Navbar = () => {
return (
  <div className="navbar-container">
    <div className="logo-container">PHOTO</div>
    <div className="link-parent">
    <div className="link-container">
        <ul>
            <li><a href="/">home</a></li>
            <ScrollLink
  to="hero"
  smooth={true}
  duration={500}
  className="scroll-link"
>
  About
</ScrollLink>
            <li><a href="https://www.w3.org/">project</a></li>
            <li><a href="https://www.w3.org/">gallery</a></li>
            <li><RouterLink to="/blog">Blog</RouterLink></li>
            
        </ul>
        
    </div>
    <button>KONTAKT</button>
    </div>
    

  </div>
)
}


export default Navbar