import { Router } from 'express';
import { TypeServer } from '../../../ts';

import templateRouter from './template';
import serverRouter from './server';
import { privateMiddleware } from '../middlewares';

const api = Router();

api.use('/', privateMiddleware);
api.use('/template', templateRouter);
api.use('/server', serverRouter);

// Test route
api.post('/create-server', (req, res) => {
  const type: TypeServer = req.body.type;
  const template: string = req.body.template;
  const creator_id: string = req.body.creator_id;
});

export default api;
