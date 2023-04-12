import mongoose, { Document, Model, Schema } from "mongoose";
import { IClient } from "./Client";
import Joi from "joi";

interface IAddress extends Document {
  CEP: number;
  cidade: string;
  estado: string;
  logradouro: string;
  bairro: string;
  numero: number;
  complemento?: string;
  client: Array<mongoose.Types.ObjectId | IClient>;
}

const addressSchema: Schema<IAddress> = new Schema<IAddress>({
  CEP: {
    type: Number,
    required: true,
    min: 1000000,
    max: 99999999,
  },
  cidade: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  estado: {
    type: String,
    required: true,
    trim: true,
    length: 2,
  },
  logradouro: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  bairro: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  numero: {
    type: Number,
    required: true,
    min: 1,
  },
  complemento: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  client: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    }
  ]
});

const Address: Model<IAddress> = mongoose.model<IAddress>('Address', addressSchema);

// Definição das validações
const addressValidationSchema = Joi.object({
  CEP: Joi.number().integer().min(8).max(8).required(),
  cidade: Joi.string().trim().min(2).max(50).required(),
  estado: Joi.string().trim().length(2).required(),
  logradouro: Joi.string().trim().min(2).max(100).required(),
  bairro: Joi.string().trim().min(2).max(50).required(),
  numero: Joi.number().integer().min(1).required(),
  complemento: Joi.string().trim().max(100),
  client: Joi.array().items(Joi.string().hex().length(24)),
});

export { Address, addressSchema, IAddress, addressValidationSchema };

