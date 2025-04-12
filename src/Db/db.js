// Import mongoose and schema using ES Modules
import mongoose from 'mongoose';
const pokeSchema = new mongoose.Schema({
    name: String,
    data: Object,
});

// Export the model
const Poke = mongoose.model('Poke', pokeSchema);


// Connect to MongoDB
// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


console.log('MongoDB connected');
 



// Export mongoose for use in other files



async function checkPoki(poki){
    
                if ( await Poke.findOne({ name: poki })!== null) {
                    console.log('Found Pokémon in database');
                    return Poke.findOne({ name: poki });
                }
                else{
                    console.log('Pokémon not found in database');
                    return null;
                }
            
            };



async function addNewPoke(poki, data){
                const newPok = new Poke({
                    name: poki,
                    data: data
                    });
                await newPok.save();
                console.log('Pokémon added to database:', poki);
    
            };
            

            
async function fetchPokemonData() {
                setLoading(true);
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemun}`);
                    const pokemonData = await res.json();
                    console.log("Fetched Pokémon data:", pokemonData);
                    setData(pokemonData);

                    // Update cache

                    await addNewPoke(pokemun, data);





                    
                    
                } catch (err) {
                    console.error("Error fetching Pokémon data:", err);
                } finally {
                    setLoading(false);
                }
            }

// Optional: Test insert



// Optional: Disconnect after use
await mongoose.disconnect();
console.log('MongoDB disconnected');
// Export the model for use in other files  
