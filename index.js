require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { Client } = require('pg');
const port = +process.env.PORT || 5000;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();

// app.use(cors());

app.get('/api/recipes', (req, res) => {
  client.query('SELECT * FROM recipes ORDER BY id', (err, dbResponse) => {
    res.json(dbResponse.rows);
  });
});

app.get('/api/recipes/:id', (req, res) => {
  client.query(`SELECT * FROM recipes WHERE id = $1`, [+req.params.id], (err, dbResponse) => {
    if (err) {
      res.status(400).send('Unknown error')
    } else if (dbResponse.rows.length === 0) {
      res.status(404).send('Not found')
    } else {
      res.json(dbResponse.rows[0]);
    }
  });
});

app.post('/api/recipes', bodyParser.json(), (req, res) => {
  const { title, description, dish_kind } = req.body;
  client.query('INSERT INTO recipes (title, description, creation_date, dish_kind) VALUES (ARRAY [ $1 ], ARRAY [ $2 ], ARRAY [ $3 ], ARRAY [ $4 ]) RETURNING id, creation_date[1]', [title, description, new Date().toISOString(), dish_kind], (err, dbResponse) => {
    res.status(201);
    res.json({
      id: dbResponse.rows[0].id,
      title,
      description,
      dish_kind,
      creation_date: dbResponse.rows[0]["creation_date"],
    });
  });
});

app.put('/api/recipes/:id', bodyParser.json(), (req, res) => {
  const { title, description, dish_kind } = req.body;
  client.query(
    'UPDATE recipes SET title = array_prepend($1, title), description = array_prepend($2, description), creation_date = array_prepend($3, creation_date), dish_kind = array_prepend($4, dish_kind) WHERE id = $5 RETURNING *',
    [title, description, new Date().toISOString(), dish_kind, +req.params.id],
    (err, dbResponse) => {
    if (dbResponse.rowCount === 0) {
      res.status(400).json({error: 'No such recipe'});
      return;
    }
    res.json(dbResponse.rows[0])
  });
});

app.delete('/api/recipes/:id', (req, res) => {
  client.query('DELETE FROM recipes WHERE id = $1', [+req.params.id], (err, dbResponse) => {
    if (dbResponse.rowCount === 0) {
      res.status(400);
      res.json({error: 'No such recipe'});
      return;
    }
    res.json({error: null})
  });
});

app.use(express.static(path.join(__dirname, 'front/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
