const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const { title, status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 RETURNING *',
    [title, status, req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
  if (!result.rows.length) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
