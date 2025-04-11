// Import mongoose
import mongoose from 'mongoose';

// Define the schema
const pokeSchema = new mongoose.Schema({
    name: String,
    data: Object,
});

// Export the model
const Poke = mongoose.model('Poke', pokeSchema);
export default Poke;
