import { Router } from 'express';
import { listTemplates } from '../../../database/functions';

const template = Router();

// List all templates
template.get('/list', async (req, res) => {
  const data = await listTemplates();

  if (!data) {
    return res.status(404).json({ error: 'No data found', data: [] });
  }

  return res.json({ data: data });
});

export default template;
