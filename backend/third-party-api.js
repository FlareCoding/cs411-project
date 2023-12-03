const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchGithubRepoContents(repoUrl, path = '') {
    try {
      // Extract the owner and repo name from the URL
      const repoPath = new URL(repoUrl).pathname;
      const [owner, repo] = repoPath.split('/').filter(part => part);
  
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await axios.get(apiUrl);
  
      // Recursively fetch contents for directories
      let files = [];
      for (const item of response.data) {
        if (item.type === 'file') {
          files.push({ name: item.name, path: item.path, type: item.type });
        } else if (item.type === 'dir') {
          const nestedFiles = await fetchGithubRepoContents(repoUrl, item.path);
          files = files.concat(nestedFiles);
        }
      }
  
      return files;
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      throw error;
    }
}

async function requestChatGptResponse(prompt) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
    });
    console.log(chatCompletion.choices[0].message);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);  // e.g. 'invalid_api_key'
      console.error(error.type);  // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
  }
}

module.exports = {
    fetchGithubRepoContents,
    requestChatGptResponse
}
