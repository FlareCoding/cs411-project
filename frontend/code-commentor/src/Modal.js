import React, { useState } from 'react';
import './HomeScreen.css'; // Import the CSS for HomeScreen

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
        <div className="modalOverlay">
            <div className="modalContent">
            <h2 className="modalHeader">Link a GitHub Repo</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Paste the repo link here"
                value={repoLink}
                onChange={handleLinkChange}
                className="input"
                />
                <div className="buttonContainer">
                <button type="submit" className="button submitButton">Submit</button>
                <button onClick={onClose} className="button cancelButton">Cancel</button>
                </div>
            </form>
            </div>
        </div>
    );      
}

export default Modal;
