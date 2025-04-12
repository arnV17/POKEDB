import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Poke from '../Db/schema.js'; // Adjust the path if needed

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Enable CORS
app.use(cors());

// Parse JSON payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/api/pokemon', async (req, res) => {
  try {
    const allPoke = await Poke.find();
    res.json(allPoke);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Pokémon' });
  }
});

app.post('/api/pokemon', async (req, res) => {
  try {
    const newPoke = await Poke.create(req.body);
    res.status(201).json(newPoke);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create Pokémon' });
  }
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error('❌ MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
}

startServer();
