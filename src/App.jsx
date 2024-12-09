import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {

  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;