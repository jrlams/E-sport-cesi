import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use PostgreSQL environment variables
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB, NODE_ENV } = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST || !POSTGRES_DB) {
  throw new Error('Missing PostgreSQL configuration in environment variables.');
}

const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection failed:', err));


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// API endpoints rewritten for PostgreSQL
app.post('/api/registrations', async (req, res) => {
  try {
    const { email, pseudo, team_name, game, phone } = req.body;
    const query = 'INSERT INTO registrations (email, pseudo, team_name, game, phone) VALUES ($1, $2, $3, $4, $5)';
    const values = [email, pseudo, team_name, game, phone];
    await pool.query(query, values);
    res.status(201).send({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating registration', error });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching registrations', error });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again } = req.body;
    const query = 'INSERT INTO feedback (email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again];
    await pool.query(query, values);
    res.status(201).send({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error submitting feedback', error });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching feedback', error });
  }
});

app.get('/api/stream', (req, res) => {
  // The stream URL can be stored in .env or hardcoded if it's static
  const streamUrl = process.env.STREAM_URL || 'https://www.twitch.tv/cesi_esport';
  res.status(200).json({ url: streamUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
