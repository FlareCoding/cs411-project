// Import required modules
const axios = require('axios');
const OpenAI = require('openai');
const fetch = require('node-fetch');
require('dotenv').config();

// Get GitHub API key from environment variables
const GITHUB_API_KEY = process.env.GITHUB_API_KEY;

// Create an instance of the OpenAI API client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to fetch the content of a specific file in a GitHub repository
async function fetchGithubFileContent(repo, filepath) {
  // Extract the necessary parts from the GitHub repo URL
  const repoParts = repo.replace('https://github.com/', '').split('/');
  const username = repoParts[0];
  const repository = repoParts[1];
  const branch = 'master'; // Default branch, modify if needed

  // Construct the raw content URL
  const rawUrl = `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${filepath}`;

  try {
    // Fetch the content from GitHub
    const response = await axios.get(rawUrl);
    return response.data; // This is the file content
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
}

// Function to fetch the contents of a GitHub repository
async function fetchGithubRepoContents(repoUrl, path = '') {
  let files = [];

  try {
    // Extract the owner and repo name from the URL
    const repoPath = new URL(repoUrl).pathname;
    const [owner, repo] = repoPath.split('/').filter(part => part);

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const headers = {
      'Authorization': `token ${GITHUB_API_KEY}`
    };

    const response = await axios.get(apiUrl, { headers });

    const excludedDirs = [
      'node_modules'
    ];

    // Check if the response is an array (i.e., a directory)
    if (Array.isArray(response.data)) {
      for (const item of response.data) {
        if (item.type === 'file') {
          files.push({ name: item.name, path: item.path, type: item.type });
        } else if (item.type === 'dir') {
          if (!excludedDirs.includes(item.name)) {
            const nestedFiles = await fetchGithubRepoContents(repoUrl, item.path);
            files = files.concat(nestedFiles);
          }
        }
      }
    } else {
      // Single file response
      files.push({ name: response.data.name, path: response.data.path, type: response.data.type });
    }

  } catch (error) {
    console.error('Error fetching repository contents:', error);
    throw error;
  }

  return files;
}

// Function to request a chat-based response from the GPT-3.5 model
async function requestChatGptResponse(prompt) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
    });
    return chatCompletion.choices[0].message;  // Return the response message
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);  // e.g. 'invalid_api_key'
      console.error(error.type);  // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.error(error);  // Use console.error for consistency
    }
    return null;  // Return null or appropriate value in case of error
  }
}

// Export the functions for use in other modules
module.exports = {
  fetchGithubFileContent,
  fetchGithubRepoContents,
  requestChatGptResponse
}