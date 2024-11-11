const express = require("express");
// Importa o framework Express para criar e gerenciar um servidor HTTP.

const cors = require("cors");
// Importa o pacote CORS (Cross-Origin Resource Sharing) para permitir que o servidor responda a requisições de outras origens (cross-origin).

const app = express();
// Cria uma instância do aplicativo Express, que é usada para configurar e gerenciar as rotas e middlewares.

app.use(express.json());
// Configura o middleware do Express para analisar corpos de requisições no formato JSON, permitindo que o servidor receba e manipule dados enviados no formato JSON.

app.use(cors('http://localhost3000/usuarios'));
// Configura o middleware CORS para permitir requisições vindas de uma origem específica (o link tem um erro de digitação e deveria ser 'http://localhost:3000').

const users = [
    {
        name: '/', 
        age: '/',
    },
];
// Cria um array 'users' que serve como um armazenamento local de usuários. Inicialmente, contém um objeto com valores de nome e idade como '/'. 

app.get('/usuarios', function (request, response) {
    // Define uma rota GET em '/usuarios'. Quando acessada, a função de callback é executada.
    response.json(users);
    // Envia a lista de usuários como resposta em formato JSON.
});

app.post('/usuarios', function (request, response) {
    // Define uma rota POST em '/usuarios' para criar novos usuários. A função de callback é executada quando a rota é acessada.
    console.log(request.body);
    // Imprime o corpo da requisição no console, que contém os dados do novo usuário enviado.

    const newUser = request.body;
    // Armazena os dados do novo usuário na variável 'newUser'.

    users.push(newUser);
    // Adiciona o novo usuário ao array 'users'.

    response.status(201).json(newUser);
    // Envia uma resposta com o status 201 (Created) e o novo usuário em formato JSON.
});

app.listen(3000, () => console.log("Servidor rodando"));
// Configura o servidor para escutar na porta 3000. Quando o servidor inicia, exibe "Servidor rodando" no console.
