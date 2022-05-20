import ReactMarkdown from 'react-markdown';
import useFetchRepoDetails from '../hooks/useFetchRepoDetails';

const RepoDetails = ({ repos, repoToDetail, setRepoToDetail }) => {
  const repo = repos.filter((item) => item.full_name === repoToDetail)[0];

  const { commitDetails, readmeDetails } = useFetchRepoDetails(repo.full_name);

  return (
    <div className="repo-detail-container">
      <h2>{repo.name}</h2>
      <p>Last Commit</p>
      {commitDetails && <CommitDisplay commitDetails={commitDetails} />}
      {readmeDetails && (
        <ReactMarkdown className="markdown">{readmeDetails}</ReactMarkdown>
      )}
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

const CommitDisplay = ({ commitDetails }) => {
  return (
    <>
      <p>Author: {commitDetails.author}</p>
      {commitDetails.date && <p>Date: {commitDetails.date}</p>}
      <p>Message:{commitDetails.message}</p>
    </>
  );
};

export default RepoDetails;
