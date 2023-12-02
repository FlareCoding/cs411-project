const axios = require('axios')

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

module.exports = {
    fetchGithubRepoContents
}
