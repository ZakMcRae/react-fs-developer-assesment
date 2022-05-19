import React, { useEffect } from 'react';
import './App.css';
import ReposList from './components/ReposList';

export function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [repoData, setRepoData] = React.useState(null);

  // Fetch and sort the data from the backend api
  useEffect(() => {
    const fetchAndSortData = async () => {
      // handle the data if response is ok
      try {
        const response = await fetch('http://localhost:4000/repos', {});

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);

          // sort the data into reverse chronological order by creation date and store in state
          data.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1));
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

  return (
    <div className="App">
      {isLoading && <div className="loading-screen">Fetching Data...</div>}
      {repoData && <ReposList repos={repoData} />}
    </div>
  );
}
