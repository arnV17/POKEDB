import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// ✅ Set payload size limit to avoid 413 errors
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB

console.log('✅ Connected to MongoDB');

// Routes
app.get('/api/pokemon', async (req, res) => {
  const allPoke = await Poke.find();
  res.json(allPoke);
});

app.post('/api/pokemon', async (req, res) => {
  const newPoke = await Poke.create(req.body);
  res.status(201).json(newPoke);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
