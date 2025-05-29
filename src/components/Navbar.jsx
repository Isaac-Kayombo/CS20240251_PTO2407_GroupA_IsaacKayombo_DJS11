import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import search_icon_light from '../assets/search-white.png'
import search_icon_dark from '../assets/search-black.png'
import toggle_light from '../assets/night.png'
import toggle_dark from '../assets/day.png'

// DEFINING NAVBAR COMPONENT
function Navbar({theme, setTheme}) {

    // TODDLES THEME BETWEEN 'LIGHT' AND 'DARK'
    const toggleMode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }

    // RENDERS NAVBAR COMPONENT
    return (
        <div className='navbar'>
            <div className='logo'>
                <h1>ClearCast</h1>
            </div>

            <nav className='nav-links'>
                <Link to="/">HOME</Link>
                <Link to="/favorites">FAVORITES</Link>
            </nav>

            <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt='search icon'/>
            </div>

            <img onClick={()=>{toggleMode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt='toggle icon' className='toggle-icon'/>
        </div>
    )
}

export default Navbar;