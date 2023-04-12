# Miguel S. Silva

Esse projeto proposto pela TeamSoft é um desafio  com o obejtivo de criar as operações basicas de duas entidades chamadas:
Cliente e Endereço. Onde um cliente pode ter mais de 1 endereço

# Configurações do projeto
- Node.js
- Typescript
- MongoDB 
- Padrão MVC para os arquivos da aplicação

# Sugestões:
Antes de rodar o projeto, vá na pasta `db` e abra o arquivo `db.ts`, nele se encontra a função de conexão com o banco de dados MongoDB, como foi sugerido no projeto. Troque as devidas informações para as configurações da sua maquina

Faça as requisições HTTP no seu software conforme a descrição da imagem.

# Comando para inicializar o projeto
 `npm init -y` para fazer o download da pasta node_modules e  `npm run dev` para iniciar o projeto.


# como testar o projeto
Para executar os testes de execução deste projeto voce deve seguir o padrão de edentação/formatação que esta na imagem, sem errar o nome dos campos ou os items que vai colocar.

A imagem a seguir simula a criação com o metodo POST de um endereço em um Cliente já existente.
Na parte direita da foto é demonstrado o status_code da rota e o seu resultado.
Na parte esquerda na imagem é possivel ver as rotas que cada operação faz (Cadastro, Leitura/Busca, Alteração e Exclusão) de acordo com cada entidade (Client/Adress). 
Monte o seu software de teste de requisições HTTP no mesmo padrão da imagem.

![CRUD](https://user-images.githubusercontent.com/69445570/231390191-df5c05ac-4caf-4aee-bd95-4bb953b096a7.png)


#Estrutura de pastas

Logo quando se abre o projeto CRUD, temos a pasta e o arquivo `App.ts` que é por onde se inicia a nossa aplicação, nela temos a conexão com o banco de dados `MongoDB` e o `express` para gerenciar as requisições de diferentes verbos HTTP em diferentes URLs.

-> Na pasta `src` onde é guardado as nossas camadas da aplicação, utilizando o padrão MVC (Model, View e Controllers) é separado da seguinte forma:

- models
- controllers
- db
- routes

#Models 
Na pasta Models temos dos arquivos  `Adress.ts` e `Client.ts`, eles são as duas entidades da nossa aplicação, que dentro delas temos a criação dos seus requisitos individuais, como por exemplo no `Client` temos os campos `CNPJ`, `razaosocial`, `nome` `telefone` `addresses` como requisitos de dado.

`
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
`

Nele podemos ver que é utilizado o `Typescript` para a tipagem dos nossos dados, e o `mongoose` que é uma `lib` externa do banco `mongoDB` para tratarmos as nossas models dentro do banco de dados. E utilizamos o `Joi` como nossa ferramenta de validação dos campos.

A mesma coisa se repete no `Adress.ts`:

`

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



`



##Contro






