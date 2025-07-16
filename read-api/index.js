import express from 'express';
import { readStore } from '../query-service/index.js';

const app = express();

app.get('/users', (req, res) => {
  res.json(readStore);
});

app.listen(3002, () => console.log('Read API running on port 3002'));
