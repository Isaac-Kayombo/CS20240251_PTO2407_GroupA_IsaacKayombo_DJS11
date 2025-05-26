import { useEffect, useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PodcastDetail from "./pages/podcastDetail";

function App() {
  const currentTheme = localStorage.getItem('currentTheme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');

  useEffect(() => {
    localStorage.setItem('currentTheme', theme);
  }, [theme])

  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/podcast/:id' element={<PodcastDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App