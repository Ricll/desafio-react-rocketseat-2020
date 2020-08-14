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

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex >= 0) {
      const updatedRepositoryList = [...repositories];

      updatedRepositoryList.splice(repositoryIndex, 1);

      setRepositories(updatedRepositoryList);

      await api.delete(`repositories/${id}`);
    }
  }

  return (

    <div>

      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
          </button>

          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
