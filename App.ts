import express, { Application } from 'express';
import cors from 'cors';
import router from './src/routes/router';
import { connectDB } from './src/db/db';

const app: Application = express();
const port = 3434;

app.use(cors());
app.use(express.json());
app.use('/api', router);

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((error) => {
        console.log(`Erro ao conectar com o banco de dados: ${error}`);
    });