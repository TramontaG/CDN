import { config } from 'dotenv';

config({
	path: '.env',
});

import Express from 'express';
import AppRouter from './router';

const App = Express();

App.use('/', AppRouter);

App.listen(1589);
