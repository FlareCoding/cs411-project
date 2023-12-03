const db = require('../database/database.js');
const express = require('express');
const thirdPartyApi = require('./third-party-api');
const app = express();

TEST_PROMPT = `
Please document the following functions in a doxygen style comment above the function declaration only
uint64_t _resetXhciController(int status) {
  // some code
}
`;

app.get('/users', (req, res) => {
  db.query('SELECT * FROM new_user_repositories', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed');
      return;
  }
  });
});

app.get('/api/read_repo', async (req, res) => {
  const gitRepoLink = req.query.repoLink;

  try {
    // Call the function and wait for the result
    const repoContents = await thirdPartyApi.fetchGithubRepoContents(gitRepoLink);

    // Send the result back
    res.json(repoContents);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching GitHub Repo Contents:', error);
    res.status(500).send('Error fetching repository contents');
  }
});

// starts server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

