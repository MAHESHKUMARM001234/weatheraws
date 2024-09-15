import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import Home from './components/Home';
import News from './components/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WeatherComponent from './components/WeatherComponent';
import Newstwo from './components/Newstwo';
import TemperatureMap from './components/Tempmap';
import Home001 from './components/Home001';
import Homedata from './components/Homedata';
import Wind from './components/Wind';
import Cloudnew from './components/Cloud';
import Pressure from './components/Pressure';
import Home651 from './components/Home651';
function App() {
  return (
    <div className="App">
      {/* <Home />
      <News /> */}
      {/* <Newstwo /> */}
      {/* <Contact /> */}
      {/* <WeatherComponent /> */}
      {/* <TemperatureMap /> */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path='/temp' element={<TemperatureMap />} />
            <Route path='/cloud' element={<Cloudnew/ >} />
            <Route path='/pressure' element={<Pressure />} />
            <Route path='/wind' element={<Wind />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
