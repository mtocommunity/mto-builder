import { Router } from 'express';
import { TypeServer } from '../../../ts';
import templateRouter from './template';

const api = Router();

api.use('/template', templateRouter);

// Test route
api.post('/create-server', (req, res) => {
  const type: TypeServer = req.body.type;
  const template: string = req.body.template;
  const creator_id: string = req.body.creator_id;
});

export default api;
