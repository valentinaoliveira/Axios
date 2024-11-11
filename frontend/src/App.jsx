import { useState, useEffect } from 'react'; 
// Importa os hooks useState e useEffect do React. useState é usado para gerenciar estados, e useEffect é para executar efeitos colaterais em componentes.

import './App.css'; 
// Importa o arquivo de estilos CSS para aplicar formatação ao componente.

import axios from 'axios'; 
// Importa a biblioteca axios, que é usada para fazer requisições HTTP.

const api = axios.create({ 
  baseURL: 'http://localhost:3000' 
}); 
// Cria uma instância do axios com a URL base configurada para o servidor local, facilitando as requisições HTTP.

function App() { 
  // Define o componente principal App.

  const [users, setUsers] = useState([]); 
  // Cria uma variável de estado chamada 'users' para armazenar a lista de usuários, inicializando-a como um array vazio.

  const [Name, setName] = useState(''); 
  // Cria uma variável de estado 'Name' para armazenar o nome digitado pelo usuário.

  const [Age, setAge] = useState(''); 
  // Cria uma variável de estado 'Age' para armazenar a idade digitada pelo usuário.

  // useEffect para executar a chamada à API quando o componente é montado
  useEffect(() => {
    api.get('/usuarios').then((response) => { 
      // Faz uma requisição GET para '/usuarios' e espera pela resposta.
      console.log(response.data); 
      // Exibe os dados da resposta no console para fins de debug.
      setUsers(response.data); 
      // Atualiza a variável de estado 'users' com os dados recebidos da API.
    }).catch((error) => { 
      console.error("Erro ao buscar usuários:", error); 
      // Exibe um erro no console caso a requisição falhe.
    });
  }, []); 
  // O array de dependências vazio faz com que o useEffect rode apenas uma vez, na montagem do componente.

  function newUser() { 
    // Função que é chamada quando o botão de adicionar é clicado.
    api.post('/usuarios', { 
      Name, Age, 
    }).then((response) => { 
      console.log(response); 
      // Exibe a resposta no console após a criação do usuário.
    });
  }

  return ( 
    // Estrutura JSX que define o que será exibido na interface.
    <>
      <div>
        <h1>Usuário</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>Nome: {user.Name} - Idade: {user.Age}</li>
            // Itera sobre a lista 'users' e cria um item de lista para cada usuário com seu nome e idade.
          ))}
        </ul>

        <h2>Adicionar novos usuários</h2>
        <input placeholder='Nome' onChange={ event => setName(event.target.value)} />
        

        <input placeholder='Idade' onChange={ event => setAge(event.target.value)}/>


        <button onClick={newUser}>Adicionar</button>
      
      </div>
    
    </>
  );
} //Campo de input para inserir o nome. A função onChange atualiza a variável 'Name' com o valor digitado. 

export default App; 
// Exporta o componente App como padrão para que possa ser importado e usado em outros arquivos.
