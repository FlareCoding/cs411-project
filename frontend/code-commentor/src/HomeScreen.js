import React, { useState } from 'react';
import Header from './HomeScreenHeader'; // Import Header component
import Sidebar from './Sidebar';
import saveRepoToDatabase from './db-api';
import './HomeScreen.css'; // Import the CSS for HomeScreen

function HomeScreen({ username, email, onLogout }) {
  const [selectedRepoUrl, setSelectedRepoUrl] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onRepoLinked = (repoLink) => {
    saveRepoToDatabase(repoLink, username, email);
  };

  const onRepoSelected = (repoLink) => {
    fetchRepoFiles(repoLink);
  };

  // Placeholder function for fetching files
  const fetchRepoFiles = async (repoUrl) => {
    try {
      const response = await fetch(`http://localhost:4000/api/read_repo?repoLink=${encodeURIComponent(repoUrl)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Assuming your server responds with JSON data
      // Handle the response data here
      setSelectedRepoUrl(repoUrl);
      setRepoFiles(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
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
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onRepoLinked={onRepoLinked} onRepoSelected={onRepoSelected}/>
      <Header username={username} email={email} onLogout={onLogout} />
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
    </div>
  );
}

export default HomeScreen;
