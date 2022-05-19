import React from 'react';
import LanguageFilter from './LanguageFilter';
import RepoDetails from './RepoDetails';

const RepoList = ({ repos }) => {
  const [filterLanguage, setFilterLanguage] = React.useState('all');
  const [repoToDetail, setRepoToDetail] = React.useState(null);

  return (
    <div className="repos-list-container">
      {/* if user clicks repo in ReposList - display RepoDetails pop up */}
      {repoToDetail && (
        <RepoDetails
          repos={repos}
          repoToDetail={repoToDetail}
          setRepoToDetail={setRepoToDetail}
        />
      )}
      <h1 className="repos-list-title">Repos List</h1>

      {/* row of buttons to filter repos by language */}
      <LanguageFilter repos={repos} setFilterLanguage={setFilterLanguage} />

      <ul className="repos-list">
        <RepoHeaderRow />
        {/* filter repos by language if one selected */}
        {filterLanguage === 'all'
          ? repos.map((repo) => (
              <RepoRow
                repo={repo}
                setRepoToDetail={setRepoToDetail}
                key={repo.id}
              />
            ))
          : repos
              .filter((repo) => repo.language === filterLanguage)
              .map((repo) => (
                <RepoRow
                  repo={repo}
                  setRepoToDetail={setRepoToDetail}
                  key={repo.id}
                />
              ))}
      </ul>
    </div>
  );
};

const RepoRow = ({ repo, setRepoToDetail }) => {
  return (
    <li
      className="repo-row"
      // when specific repo is clicked - set state to display RepoDetails pop up
      onClick={() => {
        setRepoToDetail(repo.full_name);
      }}
    >
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
