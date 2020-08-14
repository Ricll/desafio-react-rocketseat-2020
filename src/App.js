import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);


  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: 'Novo Projeto Adicionar',
      url: 'http://github.com/desafio-node-js',
      techs: ['React, Node.js']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
  }

  return (

    <div>

      <ul data-testid="repository-list">
        <ul> {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>

        </li>)}

        </ul>

        <li>

        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
