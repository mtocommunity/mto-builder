import 'dotenv/config';
import { IConfig } from './ts';

const Config: IConfig = {
  BUILD_PROCESS: {
    MAX_TIME: 10 // Minutes
  },
  DISCORD: {
    TOKEN: process.env.DISCORD_BOT_TOKEN || ''
  },
  HTTP: {
    PORT: Number(process.env.HTTP_PORT) || 3000
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USERNAME || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    DATABASE: process.env.DB_DATABASE || ''
  }
};

export default Config;
