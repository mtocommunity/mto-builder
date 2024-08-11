import Config from '../config';
import client from './client';

import eventHandler from './eventHandler';

eventHandler(client);

client.login(Config.DISCORD.TOKEN);
