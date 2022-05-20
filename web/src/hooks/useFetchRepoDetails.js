import { useEffect, useState } from 'react';

// Fetch commit details and readme from github
const useFetchRepoDetails = (repoName) => {
  const [commitDetails, setCommitDetails] = useState(null);
  const [readmeDetails, setReadmeDetails] = useState(null);

  useEffect(() => {
    const fetchCommitDetails = async () => {
      const response = await fetch(
        `https://api.github.com/repos/${repoName}/commits`
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
        `https://raw.githubusercontent.com/${repoName}/master/README.md`
      );

      if (response.ok) {
        const data = await response.text();
        setReadmeDetails(data);
      }
    };

    fetchCommitDetails();
    fetchReadmeDetails();
  }, [repoName]);

  return { commitDetails, readmeDetails };
};

export default useFetchRepoDetails;
