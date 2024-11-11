
# Conectando Front-End com Back-End

### Estrutura de Diretórios
Coloque os arquivos de front-end e back-end em uma pasta organizada para facilitar a conexão entre as partes.

## Conectando o Front-End com o Back-End

### Front-End
1. **Instalação da Biblioteca Axios**:
   - No terminal do projeto, instale o `axios` com o comando:
     ```bash
     npm install axios
     ```
   - Essa biblioteca facilita a comunicação entre o front-end e o back-end.

2. **Importação do Axios**:
   - No arquivo `App.jsx`, importe o `axios`:
     ```javascript
     import axios from 'axios';
     ```
   - Após a instalação, o `axios` estará disponível na pasta `node_modules`.

3. **Configuração da URL do Servidor**:
   - Crie uma instância do `axios` para definir a base da URL do servidor:
     ```javascript
     const api = axios.create({
       baseURL: 'http://localhost:3000'
     });
     ```

4. **Requisição GET ao Servidor**:
   - No início da função `App()`, faça uma requisição GET para buscar dados:
     ```javascript
     api.get('/usuarios').then((response) => {
       console.log(response);
     });
     ```
   - Isso envia uma solicitação para a rota `/usuarios` e exibe a resposta no console.

5. **Verificação no Navegador**:
   - Acesse o endereço do servidor no navegador, clique com o botão direito e selecione **Inspecionar > Console**. Se houver erros, é provável que o servidor esteja bloqueando acessos por padrão para proteger os dados.

### Código Base do Front-End:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

function App() {
  api.get('/usuarios').then((response) => {
    console.log(response);
  });
}
```

### Back-End
1. **Instalação do CORS**:
   - No terminal do projeto back-end, instale o `cors` com o comando:
     ```bash
     npm install cors
     ```
   - O `cors` permite controlar quais origens podem acessar o servidor, aumentando a segurança.

2. **Importação e Uso do CORS**:
   - Importe o `cors` no arquivo do servidor:
     ```javascript
     const cors = require('cors');
     ```
   - Ative o CORS no servidor:
     ```javascript
     app.use(cors());
     ```
   - Para restringir o acesso, passe a origem específica como argumento:
     ```javascript
     app.use(cors('http://localhost:3000'));
     ```

3. **Código Base do Back-End**:
   ```javascript
   const express = require("express");
   const cors = require("cors");

   const app = express();
   app.use(express.json());
   app.use(cors());

   const users = [];

   app.get('/usuarios', (request, response) => {
     response.json(users);
   });

   app.post('/usuarios', (request, response) => {
     console.log(request.body);
     const newUser = request.body;
     users.push(newUser);
     response.status(201).json(newUser);
   });

   app.listen(3000, () => console.log("Servidor rodando"));
   ```

### Voltar ao Front-End
- Após configurar o `cors` no back-end, volte ao terminal do front-end e reinicie o servidor.
- Verifique novamente no console do navegador; não deverá haver erros de bloqueio.

### Renderização de Dados no Front-End:
1. **Importação do useState e useEffect**:
   - Importar `useState` e `useEffect`:
     ```javascript
     import { useState, useEffect } from 'react';
     ```

2. **Armazenamento de Dados**:
   - Adicione um estado para armazenar os usuários:
     ```javascript
     const [users, setUsers] = useState([]);
     ```

3. **Atualização do Estado com os Dados da API**:
   - Use `useEffect` para fazer a requisição apenas uma vez na montagem do componente:
     ```javascript
     useEffect(() => {
       api.get('/usuarios').then((response) => {
         console.log(response.data);
         setUsers(response.data);
       }).catch((error) => {
         console.error("Erro ao buscar usuários:", error);
       });
     }, []);
     ```

4. **Exibição de Dados**:
   - Renderize os dados na tela:
     ```javascript
     return (
       <ul>
         {users.map((user, index) => (
           <li key={index}>Nome: {user.name} - Idade: {user.age}</li>
         ))}
       </ul>
     );
     ```

### Formulário para Adicionar Novos Usuários:
1. **Criação de Inputs**:
   - Adicione inputs para capturar nome e idade:
     ```javascript
     <input placeholder="Nome" onChange={event => setName(event.target.value)} />
     <input placeholder="Idade" onChange={event => setAge(event.target.value)} />
     ```

2. **Função para Enviar Dados**:
   - Crie uma função para enviar os dados ao servidor:
     ```javascript
     function newUser() {
       api.post('/usuarios', { name, age }).then((response) => {
         console.log(response);
       });
     }
     ```

3. **Botão para Chamar a Função**:
   - Adicione o botão com o evento `onClick`:
     ```javascript
     <button onClick={newUser}>Adicionar</button>
     ```

### Solução de Problemas:
- **Chaves Únicas no `map`**:
  - Adicione a propriedade `key` em cada `<li>` para evitar avisos do React:
    ```javascript
    {users.map((user, index) => (
      <li key={index}>Nome: {user.name} - Idade: {user.age}</li>
    ))}
    ```

- **Requisições Múltiplas**:
  - Garanta que a chamada `useEffect` seja executada apenas uma vez passando um array de dependências vazio:
    ```javascript
    useEffect(() => {
      // código da chamada da API
    }, []);
    ```

Essas instruções devem ajudá-la a conectar o front-end com o back-end de forma eficiente e a resolver possíveis problemas que surgirem.
