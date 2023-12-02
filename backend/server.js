const express = require('express');
const axios = require('axios')
const app = express();
// const OpenAI = require('openai');
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

// async function getRepoContents(repoUrl, path = '') {
//   try {
//     // Extract the owner and repo name from the URL
//     const repoPath = new URL(repoUrl).pathname;
//     const [owner, repo] = repoPath.split('/').filter(part => part);

//     const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
//     const response = await axios.get(apiUrl);

//     // Recursively fetch contents for directories
//     let files = [];
//     for (const item of response.data) {
//       if (item.type === 'file') {
//         files.push({ name: item.name, path: item.path, type: item.type });
//       } else if (item.type === 'dir') {
//         const nestedFiles = await getRepoContents(repoUrl, item.path);
//         files = files.concat(nestedFiles);
//       }
//     }

//     return files;
//   } catch (error) {
//     console.error('Error fetching repository contents:', error);
//     throw error;
//   }
// }

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

// starts server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

