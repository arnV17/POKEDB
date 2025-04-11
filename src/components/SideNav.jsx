import React from 'react';
import { useState } from 'react';

import { first151Pokemon, getPokemonIndex} from '../index.js';

function SideNav(props) {
  const { pokemun, setPokenum } = props;
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredList = first151Pokemon.filter((poki) =>
    poki.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-header">SELECT POKEMON</div>
      <div className="search-container">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search..." 
          className="pokemon-search"
        />
      </div>
      <div className="pokemon-list">
        {filteredList.map((poki) => (
          <button 
            key={poki}
            className={`pokemon-button ${pokemun === poki ? 'active' : ''}`}
            onClick={() => {
              setPokenum(poki);
            }}
          >
            <span className="pokemon-code">#{getPokemonIndex(poki)}</span>
            <span className="pokemon-name">{poki.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideNav;