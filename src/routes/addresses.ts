import { Router } from "express";
import { adresseController } from "../controllers/adressController";

const router: Router = Router();

router
    .route("/addresses")
    // Rota para criação de um endereço e seus dados no banco de dados
    .post((req, res) => adresseController.create(req, res))
    // Rota para consulta de um endereço no banco de dados
    .get((req, res) => adresseController.getAll(req, res))

router
    .route("/addresses/:id")
    // Rota para consulta de um endereço expecifico no bando de dados
    .get((req, res) => adresseController.get(req, res))
    // Rota para Atualizar os dados de um endereço
    .put((req, res) => adresseController.update(req, res))
    // Rota para Deletar um endereço pelo seu id
    .delete((req, res) => adresseController.delete(req, res))



export default router;