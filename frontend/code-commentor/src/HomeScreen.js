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
  const [selectedRepoUrl, setSelectedRepoUrl] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGithubRepos();
  });

  // Function to handle the submission of the GitHub repo link
  const handleLinkRepoSubmit = async (repoLink) => {
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

    // Send GET request to the backend
    fetchRepoFiles(repoLink);
  };

  // Placeholder function for fetching GitHub repos
  const fetchGithubRepos = async () => {
    const repos = await mockApiCall(['Repo 1', 'Repo 2', 'Repo 3']);
    setGithubRepos(repos);
  };

  // Placeholder function for fetching files
  const fetchRepoFiles = async (repoUrl) => {
    try {
      const response = await fetch(`http://localhost:4000/api/read_repo?repoLink=${encodeURIComponent(repoUrl)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Assuming your server responds with JSON data
      console.log('Response from server:', data);
      // Handle the response data here
      setSelectedRepoUrl(repoUrl);
      setRepoFiles(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Mock API call
  const mockApiCall = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  const handleFileClicked = async (filePath) => {
    try {
      const response = await fetch(`http://localhost:4000/api/document_file?repoLink=${encodeURIComponent(selectedRepoUrl)}&filepath=${filePath}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Assuming your server responds with JSON data
      console.log('Response from server:', data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
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
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {repoFiles.map((file, index) => (
            <li key={index} style={{ listStyleType: 'none' }}>
              <button 
                style={styles.buttonListItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'} // Change color on hover
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} // Revert color on mouse leave
                onClick={() => handleFileClicked(file.path)} // Handle click event
              >
                {file.path}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
  },
  buttonListItem: {
    backgroundColor: 'transparent', // Transparent background
    color: 'white', // Text color
    padding: '5px 10px', // Padding inside the button
    margin: '5px 0', // Margin for vertical spacing
    border: '0px solid transparent', // White border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Cursor changes to indicate it's clickable
    display: 'block', // Stack buttons vertically
    textAlign: 'left', // Align text to the left
    transition: 'background-color 0.1s', // Transition for the hover effect
    width: '100%'
  },
  buttonListItemHover: {
    backgroundColor: '#555', // Darker background on hover
    color: 'white',
  },
  listContainer: {
    width: 'auto', // Auto width based on content
    maxWidth: '400px', // Maximum width of the container
    margin: '0 auto', // Center the container
    padding: '0', // Reset default padding
  },
};

export default HomeScreen;
