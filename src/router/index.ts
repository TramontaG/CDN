import { Router } from 'express';
import FileRouter from './Files';

const AppRouter = Router();

AppRouter.use('/file', FileRouter);

export default AppRouter;
