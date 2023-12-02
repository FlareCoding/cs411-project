import React, { useState, useEffect } from 'react';

function Modal({ onSubmit, onClose }) {
  const [repoLink, setRepoLink] = useState('');

  const handleLinkChange = (event) => {
    setRepoLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(repoLink);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalHeader}>Link a GitHub Repo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste the repo link here"
            value={repoLink}
            onChange={handleLinkChange}
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>Submit</button>
            <button onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function HomeScreen({ username, email, onLogout }) {
  const [githubRepos, setGithubRepos] = useState([]);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGithubRepos();
    fetchFiles();
  });

  // Function to handle the submission of the GitHub repo link
  const handleLinkRepoSubmit = (repoLink) => {
    if (repoLink ===  '') {
      return;
    }

    const regex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    if (!regex.test(repoLink)) {
      console.error('Invalid GitHub repository link. Please provide a valid URL.');
      return;
    }

    setShowModal(false);

    console.log('Repo link:', repoLink);
  };

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
      <button style={styles.button} onClick={() => setShowModal(true)}>Link a GitHub Repo</button>
      <h3>Linked GitHub Repos</h3>
      <ul style={styles.list}>
        {githubRepos.map((repo, index) => <li key={index}>{repo}</li>)}
      </ul>
      <h3>Files in Selected Repo</h3>
      <ul style={styles.list}>
        {files.map((file, index) => <li key={index}>{file}</li>)}
      </ul>

      {showModal && (
        <Modal onSubmit={handleLinkRepoSubmit} onClose={() => setShowModal(false)} />
      )}
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
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
    animation: 'fadeIn 0.3s',
  },
  modalContent: {
    backgroundColor: '#2a2d37',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    width: '50%',
    maxWidth: '500px',
    color: 'white',
  },
  modalHeader: {
    marginTop: '0',
  },
  input: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#1c1e24',
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  }
};

export default HomeScreen;
