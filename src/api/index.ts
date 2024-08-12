import Express from 'express';
import Config from '../config';
import router from './router';

// Create the app
const app = Express();

// Add default router
app.use(Express.json({ limit: '50mb' }));
app.use('/', router);

// Listen on the port
app.listen(Config.HTTP.PORT, () => {
  console.log(`Server is running on http://localhost:${Config.HTTP.PORT}`);
});
