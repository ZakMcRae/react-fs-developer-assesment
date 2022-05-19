import React from 'react';
import LanguageFilter from './LanguageFilter';

const RepoList = ({ repos }) => {
  const [filterLanguage, setFilterLanguage] = React.useState('all');

  return (
    <div className="repos-list-container">
      <h1 className="repos-list-title">Repos List</h1>

      {/* row of buttons to filter repos by language */}
      <LanguageFilter repos={repos} setFilterLanguage={setFilterLanguage} />

      <ul className="repos-list">
        <RepoHeaderRow />
        {/* filter repos by language if one selected */}
        {filterLanguage === 'all'
          ? repos.map((repo) => <RepoRow repo={repo} key={repo.id} />)
          : repos
              .filter((repo) => repo.language === filterLanguage)
              .map((repo) => <RepoRow repo={repo} key={repo.id} />)}
      </ul>
    </div>
  );
};

const RepoRow = ({ repo }) => {
  return (
    <li className="repo-row">
      <p>{repo.name}</p>
      <p>{repo.description}</p>
      <p>{repo.language}</p>
      <p>{repo.forks_count}</p>
    </li>
  );
};

const RepoHeaderRow = () => {
  return (
    <li className="repo-row">
      <p>Repo Name</p>
      <p>Description</p>
      <p>Language</p>
      <p>Forks Count</p>
    </li>
  );
};

export default RepoList;
