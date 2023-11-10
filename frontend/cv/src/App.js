import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar/Navbar';
import AboutUs from './pages/About_us/About_us';
import UserCreateAccount from './components/UserCreateAccount/UserCreateAccount';
import Principal from './pages/Principal/Principal';
import Login from './components/Login/Login';
import CompanyCreateAccount from './components/CompanyCreateAccount/CompanyCreateAccount';
import AddSkill from './components/AddSkill/AddSkill';
import AddEducation from './components/AddEducation/AddEducation';

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
      <Route path="/AddEducation" element={<AddEducation/>}></Route>
        <Route path="/CreateCompanyAccount" element={<CompanyCreateAccount/>}></Route>
        <Route path="/AddSkill" element={<AddSkill/>}></Route>
        <Route path="/CreateUserAccount" element={<UserCreateAccount/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path='/' element={<Principal/>}></Route>
        <Route path="/" element={<NavbarComponent/>}>
            <Route path='/home' element={<Home/>}></Route>
            <Route path="/AbousUs" element={<AboutUs/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
    </div>
  );
}

export default App;
