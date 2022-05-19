const RepoDetails = ({ repos, repoToDetail, setRepoToDetail }) => {
  const repo = repos.filter((item) => item.full_name === repoToDetail)[0];

  // todo - work in progress
  // add additional repo detail

  return (
    <div className="repo-detail-container">
      <h2>Repo Details</h2>
      <p>{repo.name}</p>
      <button
        onClick={() => {
          setRepoToDetail(null);
        }}
      >
        Close Detail View
      </button>
    </div>
  );
};

export default RepoDetails;
