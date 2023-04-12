
import { Request, Response } from "express";
import { Address, IAddress } from "../models/Adress";

export const adresseController = {
    // metodo de criação -> CREAT
    create: async (req: Request, res: Response) => {
        try {
            const adress: IAddress = req.body;
            const addresses = await Address.create(adress);

            res.status(201).json({ addresses, msg: "Endereço criado com sucesso!" });
        } catch (err) {
            console.log("O erro ocorreu aqui: ", err);
            res.status(500).json({ error: "Erro ao criar endereço" });
        }
    },
    //metodo de consulta -> READ
    getAll: async (req: Request, res: Response) => {
        try {
            const adress = await Address.find()
            res.json(adress);

        } catch (error) {
            console.log("O erro ocorreu aqui: ", error);
            res.status(500).json({ error: "Erro ao buscar clientes" });
        }
    },
    //metodo de consulta por identificador unico (id) -> READ expecify
    get: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const adress = await Address.findById(id)

            if (!adress) {
                res.status(404).json({ msg: "Cliente não encontrado" })
                return;
            }
            res.json(adress)
        } catch (error) {
            console.log("O erro ocorreu aqui: ", error);
            res.status(500).json({ msg: "Erro ao buscar endereço" })
        }
    },
    //metodo de atualização atraves do ID -> UPDATE
    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const adress: IAddress = req.body;

            const updateAddress = await Address.findByIdAndUpdate(id, adress);

            if (!updateAddress) {
                res.status(404).json({ msg: "Endereço nao encontrado" })
                return;
            }
            res.status(200).json({ msg: "Atualizado com sucesso" })
        } catch (error) {
            console.log("O erro ocorreu aqui: ", error);
            res.status(500).json({ error: "Erro atualizar cliente" });
        }
    },
    //metodo de remoção do cliente atraves do  ID -> DELETE
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const adress = await Address.findById(id);

            if (!adress) {
                res.status(404).json({ msg: "Cliente não encontrado" })
                return;
            }

            const deletedAdress = await Address.findByIdAndDelete(id)
            res.status(200).json(deletedAdress)

        } catch (error) {
            console.log(error)
        }
    }
};
































/*
import { Request, Response } from "express";
import { Address, AddressDocument } from "../models/Adress";
import { Client, IClient } from '../models/Client';

export const adresseController = {
    // metodo de criação -> CREAT
    create: async (req: Request, res: Response) => {
        try {
            // Busca o cliente pelo ID
            const clientId = req.body.clientId;
            const client = await Client.findById(clientId);

            // Se o cliente não existir, retorna um erro
            if (!client) {
                throw new Error("Cliente não encontrado");
            }

            const address: AddressDocument = req.body;
            const newAddress = new Address(address);
            const updatedClient = await Client.findOneAndUpdate(
                { _id: client.id },
                { $push: { addresses: newAddress._id } },
                { new: true }
            );

            if (!updatedClient) {
                throw new Error("Cliente não encontrado");
            }

            await newAddress.save();

            return res.json(newAddress);

        } catch (err) {
            throw new Error(`Erro ao criar endereço: ${err.message}`);
        }
    },
}



/*
    // Cria um novo endereço com os dados fornecidos
            const adress: AddressDocument = req.body;
            const newAddress = new Address(adress);

            // Adiciona o ID do novo endereço ao array de endereços do cliente
            client.addresses.push(newAddress._id);

            // Salva o novo endereço e o cliente atualizado no banco de dados
            await Promise.all([newAddress.save(), client.save()]);

            // Retorna o novo endereço criado
*/