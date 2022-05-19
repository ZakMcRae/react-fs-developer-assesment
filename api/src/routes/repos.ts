import axios from 'axios';
import { Router, Request, Response } from 'express';
import fs from 'fs/promises';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  // read repos json file from /data - file can change while app running
  const localRepoData = JSON.parse(
    await fs.readFile('./data/repos.json', 'utf8')
  );

  // get repo data from github api
  const response = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );
  const githubRepoData = response.data;

  // combine local and github data
  const combinedRepoData = [...localRepoData, ...githubRepoData];

  // filter data where repositoy.fork is false
  const filteredRepoData = combinedRepoData.filter(
    (repo) => repo.fork === false
  );

  res.status(200);

  // set return data content type to json
  res.header('content-type', 'application/json');

  // return filterd data
  res.json(filteredRepoData);
});
