import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App