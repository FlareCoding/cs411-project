import React, { useState, useEffect } from 'react';
import Header from './HomeScreenHeader'; // Import Header component
import Sidebar from './Sidebar';
import saveRepoToDatabase from './db-api';
import Prism from 'prismjs';
import './HomeScreen.css'; // Import the CSS for HomeScreen
import "prismjs/themes/prism-tomorrow.css";

function HomeScreen({ username, email, onLogout }) {
  const [selectedRepoUrl, setSelectedRepoUrl] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState('');

  useEffect(() => {
    // Update the state or DOM here with detectedLanguage
    Prism.highlightAll();
  }, [selectedFileContent]);

  const onRepoLinked = (repoLink) => {
    //saveRepoToDatabase(repoLink, username, email);
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
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/api/document_file?repoLink=${encodeURIComponent(selectedRepoUrl)}&filepath=${filePath}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Assuming your server responds with JSON data
      //console.log('Response from server:', data);
      setSelectedFileContent(data.response.content);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setSelectedFileContent('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="top-half">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onRepoLinked={onRepoLinked} onRepoSelected={onRepoSelected}/>
        <Header username={username} email={email} onLogout={onLogout} />
        <h3>Files in Selected Repo</h3>
        <div className="listContainer">
          <ul className="list">
            {repoFiles.map((file, index) => (
              <li key={index} className="listItem">
                <button
                  className="buttonListItem"
                  disabled={isLoading}
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
      <div className="bottom-half">
        {isLoading ? (
          <div className="spinner"></div>  // Show spinner when loading
        ) : (
          <pre><code className="language-clike">
            {selectedFileContent}
          </code></pre>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
