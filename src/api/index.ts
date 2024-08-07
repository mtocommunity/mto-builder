import Express from 'express';
import Config from '../config';
import router from './router';

const app = Express();

app.use('/', router);

app.listen(Config.HTTP.PORT, () => {
  console.log(`Server is running on http://localhost:${Config.HTTP.PORT}`);
});
