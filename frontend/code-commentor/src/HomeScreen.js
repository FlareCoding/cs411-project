import React, { useState, useEffect } from 'react';

function HomeScreen({ username, email, onLogout }) {
  const [githubRepos, setGithubRepos] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchGithubRepos();
    fetchFiles();
  });

  // Placeholder function for fetching GitHub repos
  const fetchGithubRepos = async () => {
    const repos = await mockApiCall(['Repo 1', 'Repo 2', 'Repo 3']);
    setGithubRepos(repos);
  };

  // Placeholder function for fetching files
  const fetchFiles = async () => {
    const files = await mockApiCall(['File 1', 'File 2', 'File 3']);
    setFiles(files);
  };

  // Mock API call
  const mockApiCall = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>{username}</h2>
          <p>{email}</p>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <button style={styles.button}>Link a GitHub Repo</button>
      <h3>Linked GitHub Repos</h3>
      <ul style={styles.list}>
        {githubRepos.map((repo, index) => <li key={index}>{repo}</li>)}
      </ul>
      <h3>Files in Selected Repo</h3>
      <ul style={styles.list}>
        {files.map((file, index) => <li key={index}>{file}</li>)}
      </ul>
    </div>
  );
}

// Styles
const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
};

export default HomeScreen;
