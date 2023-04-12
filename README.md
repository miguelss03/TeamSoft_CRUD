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






