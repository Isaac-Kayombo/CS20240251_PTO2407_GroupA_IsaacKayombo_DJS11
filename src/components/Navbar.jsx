import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
//import search_icon_light from '../assets/search-white.png'
//import search_icon_dark from '../assets/search-black.png'
//import toggle_light from '../assets/night.png'
//import toggle_dark from '../assets/day.png'

function Navbar() {

    return (
        <div className='navbar'>
            <div className='logo'>
                <h1>POD🎙</h1>
            </div>

            <nav className='nav-links'>
                <Link to="/">HOME</Link>
                <Link to="/favorites">FAVORITES</Link>
            </nav>

            <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img alt='toggle icon' className='toggle-icon'/>
            </div>
        </div>
    )
}

export default Navbar;