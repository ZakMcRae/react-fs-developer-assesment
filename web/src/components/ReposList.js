import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="repos-list-container">
      <h1 className="repos-list-title">Repos List</h1>
      <ul className="repos-list">
        {repos.map((repo) => (
          <RepoRow repo={repo} key={repo.id} />
        ))}
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

export default RepoList;
