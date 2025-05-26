import { useEffect, useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'

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
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App