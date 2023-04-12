import express from 'express';
import { Router } from 'express';
import clientRouter from './clients';
import adressRouter from './addresses';

const router: Router = express.Router();

// rotas das entidades da aplicação
router.use('/', clientRouter);
router.use('/', adressRouter);

export default router;