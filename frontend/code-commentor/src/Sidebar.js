import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Sidebar.css'; // Ensure the CSS file is correctly linked

function Sidebar({ isOpen, onToggle, onRepoSelected }) {
    // State for managing the list of repositories
    const [githubRepos, setGithubRepos] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    // Fetch GitHub repos only on component mount
    useEffect(() => {
        const fetchGithubRepos = async () => {
            const repos = await mockApiCall([]); // Replace with your initial repo names
            setGithubRepos(repos);
        };

        fetchGithubRepos();
    }, []); // The empty array ensures this effect runs only once on mount

    const mockApiCall = async (data) => {
        // This simulates an API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(data), 1000);
        });
    };

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
        setGithubRepos([...githubRepos, { name: repoLink }]);

        onRepoSelected(repoLink);
    };

    const repoButton_OnClick = (e) => {
        const repoUrl = e.target.innerText;
        onRepoSelected(repoUrl);
    };
  
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={onToggle} className="toggleBtn">
          {isOpen ? '>' : '<'} {/* Adjust these symbols as needed */}
        </button>
        <div className="sidebarContent">
          <h3>Linked Repositories</h3>
          {githubRepos.length > 0 ? (
            <ul>
              {githubRepos.map((repo, index) => (
                <li key={index}>
                  <button className="repoButton" onClick={repoButton_OnClick}>{repo.name}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No linked repositories found.</p>
          )}
        </div>
        <button onClick={() => setShowModal(true)} className="addRepoBtn">Add Repo</button>
        {showModal && (
            <Modal onSubmit={handleLinkRepoSubmit} onClose={() => setShowModal(false)} />
        )}
      </div>
    );
  }

export default Sidebar;
