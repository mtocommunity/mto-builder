import { Router } from 'express';

const api = Router();

api.get('/hello', (req, res) => {
  res.send('Hello World');
});

export default api;
