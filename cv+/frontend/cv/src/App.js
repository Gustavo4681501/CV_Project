import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar/Navbar';
import AboutUs from './pages/About_us/About_us';
import Login from './pages/Login/Login';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<NavbarComponent/>}>

    <Route path='/' element={<Home/>}></Route>
    <Route path="/AbousUs" element={<AboutUs/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>

    </Route>
    



    </Routes>
    </BrowserRouter>
    
    
    </>
  );
}

export default App;
