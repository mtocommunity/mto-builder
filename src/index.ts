// Load api module
import './api';

// Load database module
import { verifyConnection } from './database';
verifyConnection();

// Load discord module
import './discord';
