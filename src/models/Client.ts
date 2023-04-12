import mongoose, { Document, Model, Schema } from "mongoose";
import { IAddress, Address } from "./Adress";
import Joi from "joi";

interface IClient extends Document {
  cnpj: number;
  razaoSocial: string;
  nome: string;
  telefone: number;
  addresses: Array<mongoose.Types.ObjectId | IAddress>;
}

const clientSchema: Schema<IClient> = new Schema<IClient>(
  {
    cnpj: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          return Joi.number().min(11).max(14).validate(v).error === null;
        },
        message: "CNPJ tem que ter entre 11 e 14 digitos",
      },
    },
    razaoSocial: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return Joi.string().max(100).validate(v).error === null;
        },
        message: "Razão social deve ter no maximo 100 caracteres",
      },
    },
    nome: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return Joi.string().max(50).validate(v).error === null;
        },
        message: "Nome deve ter no maximo 50 caracteres",
      },
    },
    telefone: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => {
          return Joi.number().min(10).max(11).validate(v).error === null;
        },
        message: "Telefone tem que ter entre 10 e 11 digitos",
      },
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
      }
    ],
  }
);

const Client: Model<IClient> = mongoose.model<IClient>('Client', clientSchema);

export { Client, IClient, clientSchema };
