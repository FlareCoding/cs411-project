import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import Modal component if it's also a separate component
import Header from './HomeScreenHeader'; // Import Header component
import './HomeScreen.css'; // Import the CSS for HomeScreen

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
    <div className="container">
      <Header username={username} email={email} onLogout={onLogout} />
      <button className="button" onClick={() => setShowModal(true)}>Link a GitHub Repo</button>
      <h3>Linked GitHub Repos</h3>
      <ul className="list">
        {githubRepos.map((repo, index) => <li key={index}>{repo}</li>)}
      </ul>
      <h3>Files in Selected Repo</h3>
      <div className="listContainer">
        <ul className="list">
          {repoFiles.map((file, index) => (
            <li key={index} className="listItem">
              <button
                className="buttonListItem"
                onMouseEnter={(e) => e.target.classList.add('buttonListItemHover')}
                onMouseLeave={(e) => e.target.classList.remove('buttonListItemHover')}
                onClick={() => handleFileClicked(file.path)}
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

export default HomeScreen;
