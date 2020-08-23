import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import './App.css'; 

import MainComponent from './Components/MainComponent';

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <MainComponent/>  
      </ParallaxProvider>    
    </div>
  );
}

export default App;
