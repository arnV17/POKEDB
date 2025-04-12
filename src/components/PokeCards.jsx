import { useEffect, useState } from "react";
function PokeCards({ pokemun }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    if (!pokemun) return;
    setLoading(true);

    async function fetchFromMongoDB(name) {
      try {
        const res = await fetch(`https://pokedb-1lyt.onrender.com`);
        const allPokemon = await res.json();
        const found = allPokemon.find((p) => p.name === name.toLowerCase());
        return found ? found.data : null;
      } catch (err) {
        console.error("Error checking MongoDB:", err);
        return null;
      }
    }

    async function fetchFromPokeAPI(name) {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const result = await res.json();

        // Save to MongoDB
        await fetch("https://pokedb-1lyt.onrender.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.toLowerCase(),
            data: result,
          }),
        });
        
        return result;
      } catch (err) {
        console.error("Error fetching from PokeAPI:", err);
        return null;
      }
    }

    async function loadPokemon() {
      const cached = await fetchFromMongoDB(pokemun);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      const fresh = await fetchFromPokeAPI(pokemun);
      setData(fresh);
      setLoading(false);
    }

    loadPokemon();
  }, [pokemun]);

  // Loading state
  if (loading) {
    return (
      <div className="pokemon-details-container">
        <div className="pokemon-image-container">
          <div className="pokemon-image-placeholder">LOADING...</div>
        </div>
        <div className="pokemon-header">
          <h1 className="pokemon-title">LOADING</h1>
          <span className="pokemon-id">NO.???</span>
        </div>
      </div>
    );
  }

  // Error state
  if (!data) {
    return (
      <div className="pokemon-details-container">
        <div className="pokemon-image-container">
          <div className="pokemon-image-placeholder">NOT FOUND</div>
        </div>
        <div className="pokemon-header">
          <h1 className="pokemon-title">ERROR</h1>
          <span className="pokemon-id">NO DATA</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-details-container">
      <div className="pokemon-image-container">
        {data.sprites?.front_default ? (
          <img 
            src={data.sprites.front_default} 
            alt={data.name} 
            className="pokemon-sprite" 
          />
        ) : (
          <div className="pokemon-image-placeholder">{pokemun.toUpperCase()} SPRITE</div>
        )}
      </div>
      <div className="pokemon-header">
        <h1 className="pokemon-title">{data.name.toUpperCase()}</h1>
        <span className="pokemon-id">
    Type: {data.types[0].type.name.toUpperCase()}
    {data.types.length > 1
      ? ` / ${data.types[1].type.name.toUpperCase()}`
      : ''}
  </span>
      </div>

      <div className="attacks-container">
        <h2 className="attacks-title">MOVES</h2>
        <div className="attacks-list">
          {data.moves?.length > 0 ? (
            data.moves.slice(0, 8).map((move, index) => (
              <div key={index} className="attack-item">
                <span className="attack-name">{move.move.name.toUpperCase()}</span>
              </div>
            ))
          ) : (
            <div className="attack-item">
              <span className="attack-name">NO MOVES AVAILABLE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeCards;
