const db = require('../database/database.js');

const express = require('express');
// const OpenAI = require('openai');
const thirdPartyApi = require('./third-party-api');
const app = express();
// require('dotenv').config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// TEST_PROMPT = `
// Please document the following functions in a doxygen style comment above the function declaration only
// uint64_t _resetXhciController(int status) {
//   // some code
// }
// `;

// let chatApiCall = async () => {
//   try {
//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{"role": "user", "content": TEST_PROMPT}],
//     });
//     console.log(chatCompletion.choices[0].message);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       console.error(error.status);  // e.g. 401
//       console.error(error.message); // e.g. The authentication token you passed was invalid...
//       console.error(error.code);  // e.g. 'invalid_api_key'
//       console.error(error.type);  // e.g. 'invalid_request_error'
//     } else {
//       // Non-API error
//       console.log(error);
//     }
//   }
// }

// chatApiCall();

// // Example usage
// getRepoContents('https://github.com/FlareCoding/tcp_friend').then(files => {
//   console.log(files);
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// working with the data base

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

