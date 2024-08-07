import { Router } from 'express';

const api = Router();

// Test route
api.get('/hello', (req, res) => {
  res.send('Hello World');
});

export default api;
