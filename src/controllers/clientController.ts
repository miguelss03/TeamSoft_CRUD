import { Request, Response } from "express";
import { Client, IClient } from "../models/Client";

export const clientController = {
  // metodo de criação -> CREAT
  create: async (req: Request, res: Response) => {
    try {
      const client: IClient = req.body;
      // Insere o cliente criado no banco de dados
      const clients = await Client.create(client);
      // Envia a resposta
      res.status(201).json({ clients, msg: "Cliente criado com sucesso!" });
    } catch (error) {
      console.log("O erro ocorreu aqui: ", error);
      res.status(500).json({ error: "Erro ao criar o cliente" });
    }
  },
  //metodo de consulta -> READ
  getAll: async (req: Request, res: Response) => {
    try {
      const clients = await Client.find()

      res.json(clients);

    } catch (error) {
      console.log("O erro ocorreu aqui: ", error);
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  },
  //metodo de consulta por identificador unico (id) -> READ expecify
  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const client = await Client.findById(id)

      if (!client) {
        res.status(404).json({ msg: "Cliente não encontrado" })
        return;
      }

      res.json(client)
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  },
  //metodo de atualização atraves do ID -> UPDATE
  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const client: IClient = req.body;

      const updateClient = await Client.findByIdAndUpdate(id, client);

      if (!updateClient) {
        res.status(404).json({ msg: "Cliente não encontrado" })
        return;
      }

      res.status(200).json({ client, msg: "ATUALIZADO COM SUCESSO" })

    } catch (error) {
      console.log("O erro ocorreu aqui: ", error);
      res.status(500).json({ error: "Erro atualizar cliente" });
    }
  },
  //metodo de remoção do cliente atraves do  ID -> DELETE
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const client = await Client.findById(id);

      if (!client) {
        res.status(404).json({ msg: "Cliente não encontrado" })
        return;
      }

      const deletedClient = await Client.findByIdAndDelete(id)
      res.status(200).json(deletedClient)

    } catch (error) {
      console.log(error)
    }
  }



};