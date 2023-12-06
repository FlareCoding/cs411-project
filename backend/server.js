const db = require('../database/database.js').connection;
const express = require('express');
const thirdPartyApi = require('./third-party-api');
const app = express();

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

// getting the repo link from the user
app.post('/api/update_user', async (req, res) => {
  const gitRepoLink = req.query.repoLink;
  const user_name = req.query.username;
  const user_email = req.query.email;
  const insertQuery = 'INSERT INTO new_user_repositories (user_email, user_name, repo_link) VALUES (?, ?, ?)';

  db.query(insertQuery, [user_email, user_name, gitRepoLink], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error saving data to the database');
      return;
    }

    res.status(200).send('Data saved successfully');
  });
});

app.get('/api/document_file', async (req, res) => {
  const gitRepoLink = req.query.repoLink;
  const filepath = req.query.filepath;

  try {
    const content = await thirdPartyApi.fetchGithubFileContent(gitRepoLink, filepath);
    const prompt = `Please place comments above each of the functions in the following code without adding any extra information or commentary:\n${content}`;
    console.log('Sent request to ChatGPT-3.5, awaiting response....');

    const response = await thirdPartyApi.requestChatGptResponse(prompt); // Await the response
    console.log(response);

    if (response) {
      res.send({ response });
    } else {
      res.status(500).send('Error in getting openai-chatgpt response');
    }
  } catch (error) {
    res.status(500).send(`Error occurred while generating documentation for file: ${error}`);
  }
});

// starts server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

