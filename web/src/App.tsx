import React, { useEffect } from 'react';
import './App.css';
import ReposList from './components/ReposList';

export function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [repoData, setRepoData] = React.useState(null);

  // Fetch the data from the backend api
  useEffect(() => {
    const fetchData = async () => {
      // handle the data if response is ok
      try {
        const response = await fetch('http://localhost:4000/repos', {});

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setRepoData(data);
        }
        // handle the error if response is not ok - waits 1s and retries the fetch
      } catch (error) {
        setTimeout(fetchData, 1000);
      }
    };

    // set small delay so loading screen doesn't show for a fraction of a second and dispapear
    setTimeout(fetchData, 1000);
  }, []);

  return (
    <div className="App">
      {/* temporary component to display loading state and repo data */}
      {isLoading && <div className="loading-screen">Fetching Data...</div>}
      {repoData && <ReposList repos={repoData} />}
    </div>
  );
}
