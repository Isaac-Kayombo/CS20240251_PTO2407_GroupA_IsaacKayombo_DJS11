import { useEffect, useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PodcastDetails from "./pages/PodcastDetails";
import Favorites from "./pages/Favorites";


function App() {
  // GETS CURRENT THEME FROM LOCAL STORAGE
  const currentTheme = localStorage.getItem('currentTheme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');

  useEffect(() => {
    localStorage.setItem('currentTheme', theme);
  }, [theme])

  // WRAPS APP WITH BROWSER ROUTER FOR ROUTING
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/podcast/:id' element={<PodcastDetails />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;