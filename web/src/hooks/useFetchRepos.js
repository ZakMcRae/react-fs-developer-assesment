import { useState, useEffect } from 'react';

// Fetch and sort the data from the backend api
const useFetchRepos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchAndSortData = async () => {
      // handle the data if response is ok
      try {
        const response = await fetch('http://localhost:4000/repos', {});

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);

          // sort the data into reverse chronological order by creation date and store in state
          data.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
          setRepoData(data);
        }
        // handle the error if response is not ok - waits 1s and retries the fetch
      } catch (error) {
        setTimeout(fetchAndSortData, 1000);
      }
    };

    // set small delay so loading screen doesn't show for a fraction of a second and dispapear
    setTimeout(fetchAndSortData, 1000);
  }, []);

  return { isLoading, repoData };
};

export default useFetchRepos;
