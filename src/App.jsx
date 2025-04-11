import React from 'react'
import './App.css'
import SideNav from './components/SideNav.jsx'
import { useState } from 'react'
import PokeCards from './components/PokeCards.jsx'


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("Bulbasaur"); // Default to Bulbasaur
  
  return (
    <div className="pokedex-container">
      <div className="gameboy-device">
        {/* Game screen */}
        <div className="game-screen">
          <div className="screen-inner">
            {/* Screen header */}
            <div className="screen-header">POKEDEX v1.0</div>
            
            {/* Screen content */}
            <div className="screen-content">
              {/* Left panel - SideNav component */}
              <SideNav 
                pokemun={selectedPokemon} 
                setPokenum={setSelectedPokemon} 
              />
              
              {/* Right panel - PokeCards component */}
              <PokeCards pokemun={selectedPokemon} />
            </div>
            
            {/* Screen effects */}
            <div className="pixel-effect"></div>
            <div className="scanline-effect"></div>
          </div>
        </div>
        
        {/* Controls area */}
        <div className="gameboy-controls">
          {/* D-Pad */}
          <div className="dpad-container">
            <div className="dpad-btn dpad-up"></div>
            <div className="dpad-btn dpad-right"></div>
            <div className="dpad-btn dpad-down"></div>
            <div className="dpad-btn dpad-left"></div>
            <div className="dpad-center"></div>
          </div>
          
          {/* Action buttons */}
          <div className="action-buttons">
            <div className="btn">B</div>
            <div className="btn">A</div>
          </div>
        </div>
        
        {/* System buttons */}
        <div className="system-controls">
          <div className="system-btn"></div>
          <div className="system-btn"></div>
        </div>
      </div>
    </div>
  );
}

export default App;