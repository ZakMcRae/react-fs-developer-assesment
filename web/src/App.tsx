import React from 'react';
import './App.css';
import ReposList from './components/ReposList';
import useFetchRepos from './hooks/useFetchRepos';

export function App() {
  const { isLoading, repoData } = useFetchRepos();

  return (
    <div className="App">
      {isLoading && <div className="loading-screen">Fetching Data...</div>}
      {repoData && <ReposList repos={repoData} />}
    </div>
  );
}
