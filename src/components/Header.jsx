import React from 'react';

import { first151Pokemon, getFullPokedexNumber } from '../index.js';

export function Header(props) {
    const {pokenum , setPokenum} =props
    
    console.log('Header component rendered');
    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#000000", fontSize: "2.5em", margin: "20px 0" }}>Pokédex</h1>
            <input type="text" placeholder="Search Pokémon" />
            {first151Pokemon.map((poki, index) => (
                <button key={index} onClick={()=>{
                    
                    console.log("ONLICKKK");
                    let num=getFullPokedexNumber(index)
                    setPokenum(num)

                    console.log("Pokenum", pokenum);

                    
                    
                }} className="pokedex-header" >
                    <h1>{getFullPokedexNumber(index)}</h1>
                    <h2>{poki}</h2>
                </button>
            ))}
        </div>
    );
}

export default Header;
