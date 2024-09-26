import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import Cards from './Components/Cards';
import Details from './Components/Details';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/NavBar' element={<NavBar />}></Route>
          <Route path='/Cards' element={<Cards />}></Route>
          <Route path='/details/:id' element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
