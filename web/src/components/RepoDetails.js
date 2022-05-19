import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const RepoDetails = ({ repos, repoToDetail, setRepoToDetail }) => {
  const repo = repos.filter((item) => item.full_name === repoToDetail)[0];

  const [commitDetails, setCommitDetails] = useState(null);
  const [readmeDetails, setReadmeDetails] = useState(null);

  // fetch commit and readme details for repo
  useEffect(() => {
    const fetchCommitDetails = async () => {
      const response = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits`
      );

      if (response.ok) {
        const data = await response.json();
        const commitInfo = {
          date: data[0].commit.author.date,
          author: data[0].commit.author.name,
          message: data[0].commit.message,
        };
        setCommitDetails(commitInfo);
        // set details to N/A if no commit info
      } else {
        const commitInfo = {
          date: 'N/A',
          author: 'N/A',
          message: 'N/A',
        };
        setCommitDetails(commitInfo);
      }
    };

    const fetchReadmeDetails = async () => {
      const response = await fetch(
        `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
      );

      if (response.ok) {
        const data = await response.text();
        setReadmeDetails(data);
      }
    };

    fetchCommitDetails();
    fetchReadmeDetails();
  }, [repo.full_name]);

  return (
    <div className="repo-detail-container">
      <h2>{repo.name}</h2>
      <p>Last Commit</p>
      {commitDetails && <CommitDisplay commitDetails={commitDetails} />}
      {readmeDetails && <ReactMarkdown>{readmeDetails}</ReactMarkdown>}
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
