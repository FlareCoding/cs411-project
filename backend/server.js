// Import necessary modules
const db = require('../database/database.js').connection;
const express = require('express');
const thirdPartyApi = require('./third-party-api');

// Create an instance of express
const app = express();

// Route to get all users from the database
app.get('/users', (req, res) => {
  // Query the database to get all user repositories
  db.query('SELECT * FROM new_user_repositories', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query failed');
      return;
    }
  });
});

// Route to fetch GitHub repository contents
app.get('/api/read_repo', async (req, res) => {
  // Get the repository link from the query parameters
  const gitRepoLink = req.query.repoLink;

  try {
    // Call the function to fetch GitHub repository contents and wait for the result
    const repoContents = await thirdPartyApi.fetchGithubRepoContents(gitRepoLink);

    // Send the result back as JSON
    res.json(repoContents);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching GitHub Repo Contents:', error);
    res.status(500).send('Error fetching repository contents');
  }
});

// Route to read Github-stored file content
app.get('/api/read_file_content', async (req, res) => {
  // Get the repository link and file path from the query parameters
  const gitRepoLink = req.query.repoLink;
  const filepath = req.query.filepath;

  try {
    // Fetch the file content from the GitHub repository
    const content = await thirdPartyApi.fetchGithubFileContent(gitRepoLink, filepath);

    // Send the result back as JSON
    res.json(content);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching file content:', error);
    res.status(500).send('Error fetching file content');
  }
});

// Middleware to parse request body as JSON
app.use(express.json());

// Route to update user information and save it in the database
app.post('/api/update_user', async (req, res) => {
  // Get the repository link, user name, and user email from the request body
  const gitRepoLink = req.body.repoLink;
  const user_name = req.body.name;
  const user_email = req.body.email;

  // Convert the repository link to JSON string
  //const gitRepoLinkJson = JSON.stringify([gitRepoLink]);

  // Define the database insert query
  const insertQuery = 'INSERT INTO new_user_repositories (user_email, user_name, repo_link) VALUES (?, ?, ?)';
  console.log(`query: ${insertQuery}`);

  // Execute the insert query with values from the request body
  db.query(insertQuery, [user_email, user_name, gitRepoLink], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error saving data to the database');
      return;
    }

    // Send a JSON response indicating success
    res.json({'status': 'Data saved successfully'});
  });
});

// deletes an entry in the database
app.post('/api/remove_repo', async (req, res) => {
  const user_email = req.body.email; 
  const repo_link = req.body.repoLink;

  console.log(user_email);
  console.log(repo_link); 

  const deleteQuery = 'DELETE FROM new_user_repositories  WHERE user_email = ?  AND repo_link = ?;';

  //console.log(user_email, repo_link);
  db.query(deleteQuery, [user_email, repo_link], (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error deleting data from the database');
          return;
      }

      console.log(`Entry with user name ${user_email} and repo link ${repo_link} deleted successfully`);
      res.status(200).send(`Entry with user name ${user_email} and repo link ${repo_link} deleted successfully`);
  });
});

// Route to fetch and generate documentation for a file in a GitHub repository
app.get('/api/document_file', async (req, res) => {
  // Get the repository link and file path from the query parameters
  const gitRepoLink = req.query.repoLink;
  const filepath = req.query.filepath;

  try {
    // Fetch the file content from the GitHub repository
    const content = await thirdPartyApi.fetchGithubFileContent(gitRepoLink, filepath);

    // Generate a prompt including the file content
    const prompt = `Please show the same fully provided code but with code comments added throughout, especially above function declarations, please without adding any extra information or commentary:\n${content}`;
    console.log('Sent request to ChatGPT-3.5, awaiting response...');

    // Send the prompt to a chatbot API and await the response
    const response = await thirdPartyApi.requestChatGptResponse(prompt);

    if (response) {
      // Send the chatbot response as the API response
      res.send({ response });
    } else {
      res.status(500).send('Error in getting openai-chatgpt response');
    }
  } catch (error) {
    res.status(500).send(`Error occurred while generating documentation for file: ${error}`);
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});