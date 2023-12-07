import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Sidebar.css'; // Ensure the CSS file is correctly linked

function Sidebar({ isOpen, onToggle, onRepoLinked, onRepoSelected, onRepoUnlinked, fetchUserRepos }) {
    // State for managing the list of repositories
    const [githubRepos, setGithubRepos] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      fetchUserRepos((repos) => {
        console.log(repos);
        setGithubRepos(repos);
      });
    }, [fetchUserRepos]);

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
        if (repoLink === '') {
            return;
        }

        const regex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
        if (!regex.test(repoLink)) {
            console.error('Invalid GitHub repository link. Please provide a valid URL.');
            return;
        }

        let repoExists = false;
        githubRepos.forEach(repo => {
            if (repo.name === repoLink) {
                repoExists = true;
            }
        });
        
        if (repoExists) {
            return;
        }

        setShowModal(false);
        setGithubRepos([...githubRepos, { name: repoLink }]);

        onRepoLinked(repoLink);
        onRepoSelected(repoLink);
    };

    const repoButton_OnClick = (e) => {
        const repoUrl = e.target.innerText;
        onRepoSelected(repoUrl);
    };

    const handleDeleteRepo = (repoUrl) => {
        // Filter out the repo to delete
        const updatedRepos = githubRepos.filter(repo => repo.name !== repoUrl);
        setGithubRepos(updatedRepos);

        onRepoUnlinked(repoUrl);
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
                <li key={index} className="repoListItem">
                  <button className="deleteRepoBtn" onClick={() => handleDeleteRepo(repo.name)}>
                    x
                  </button>
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
