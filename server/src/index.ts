import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { authMiddleware } from './middleware';

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

// Admin routes
app.put('/api/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, pseudo, team_name, game, phone, confirmed } = req.body;
        const query = 'UPDATE registrations SET email = $1, pseudo = $2, team_name = $3, game = $4, phone = $5, confirmed = $6 WHERE id = $7';
        const values = [email, pseudo, team_name, game, phone, confirmed, id];
        await pool.query(query, values);
        res.status(200).send({ message: 'Registration updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating registration', error });
    }
});

app.delete('/api/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM registrations WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
        res.status(200).send({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting registration', error });
    }
});

app.put('/api/feedback/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again } = req.body;
        const query = 'UPDATE feedback SET email = $1, rating = $2, organization_rating = $3, gameplay_rating = $4, venue_rating = $5, comments = $6, would_participate_again = $7 WHERE id = $8';
        const values = [email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again, id];
        await pool.query(query, values);
        res.status(200).send({ message: 'Feedback updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating feedback', error });
    }
});

app.delete('/api/feedback/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM feedback WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
        res.status(200).send({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting feedback', error });
    }
});

app.get('/api/settings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM settings');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching settings', error });
    }
});

app.put('/api/settings', authMiddleware, async (req, res) => {
    try {
        const { key, value } = req.body;
        const query = 'UPDATE settings SET value = $1 WHERE key = $2';
        const values = [value, key];
        await pool.query(query, values);
        res.status(200).send({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating settings', error });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
