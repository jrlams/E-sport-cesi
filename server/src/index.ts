import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sql from 'mssql';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_SERVER, DATABASE_NAME, NODE_ENV } = process.env;

if (!DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_SERVER || !DATABASE_NAME) {
  throw new Error('Missing database configuration in environment variables.');
}

const dbConfig = {
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  server: DATABASE_SERVER,
  database: DATABASE_NAME,
  options: {
    encrypt: NODE_ENV === 'production',
    trustServerCertificate: true
  }
};

sql.connect(dbConfig).then(pool => {
  console.log('Connected to SQL Server');

  app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });

  // API endpoints will be added here
  app.post('/api/registrations', async (req, res) => {
    try {
      const { email, pseudo, team_name, game, phone } = req.body;
      await pool.request()
        .input('email', sql.NVarChar, email)
        .input('pseudo', sql.NVarChar, pseudo)
        .input('team_name', sql.NVarChar, team_name)
        .input('game', sql.NVarChar, game)
        .input('phone', sql.NVarChar, phone)
        .query('INSERT INTO registrations (email, pseudo, team_name, game, phone) VALUES (@email, @pseudo, @team_name, @game, @phone)');
      res.status(201).send({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).send({ message: 'Error creating registration', error });
    }
  });

  app.get('/api/registrations', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM registrations');
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching registrations', error });
    }
  });

  app.post('/api/feedback', async (req, res) => {
    try {
      const { email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again } = req.body;
      await pool.request()
        .input('email', sql.NVarChar, email)
        .input('rating', sql.Int, rating)
        .input('organization_rating', sql.Int, organization_rating)
        .input('gameplay_rating', sql.Int, gameplay_rating)
        .input('venue_rating', sql.Int, venue_rating)
        .input('comments', sql.NVarChar, comments)
        .input('would_participate_again', sql.Bit, would_participate_again)
        .query('INSERT INTO feedback (email, rating, organization_rating, gameplay_rating, venue_rating, comments, would_participate_again) VALUES (@email, @rating, @organization_rating, @gameplay_rating, @venue_rating, @comments, @would_participate_again)');
      res.status(201).send({ message: 'Feedback submitted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error submitting feedback', error });
    }
  });

  app.get('/api/feedback', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM feedback');
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching feedback', error });
    }
  });

  app.get('/api/stream', (req, res) => {
    res.status(200).json({ url: 'https://www.twitch.tv/cesi_esport' });
  });
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
