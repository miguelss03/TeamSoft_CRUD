import { Router } from "express";
import { clientController } from "../controllers/clientController";

const router: Router = Router();

router
    .route("/clients")
    // Rota para criação de um cliente e seus dados no banco de dados
    .post((req, res) => clientController.create(req, res))
    // Rota para consulta de um cliente no banco de dados
    .get((req, res) => clientController.getAll(req, res));

router
    .route("/clients/:id")
    // Rota para consulta de um cliente expecifico no bando de dados
    .get((req, res) => clientController.get(req, res))
    // Rota para Atualizar os dados de um cliente
    .put((req, res) => clientController.update(req, res))
    // Rota para Deletar um cliente pelo seu id
    .delete((req, res) => clientController.delete(req, res))

export default router;

