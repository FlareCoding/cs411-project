import React, { useEffect, useState } from 'react';
import Login from './Login';
import { getUserProfile } from './api'; // Adjust the path as necessary

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      console.log('Using access token from local storage.');
      fetchUserProfile(accessToken);
    } else {
      console.log('No access token in local storage. User needs to log in.');

      // Parse the URL to check for OAuth callback data
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.slice(1)); // Remove the '#' part
        const newAccessToken = params.get('access_token');

        if (newAccessToken) {
          console.log('New access token received from OAuth.');
          localStorage.setItem('accessToken', newAccessToken);
          fetchUserProfile(newAccessToken);
        }
      }
    }
  }, []);

  const fetchUserProfile = async (accessToken) => {
    try {
      const data = await getUserProfile(accessToken);
      setUserData(data);
      console.log('User data fetched successfully.');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUserData(null); // Update the state to reflect that the user is logged out
    console.log('User logged out. Access token removed from local storage.');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!userData ? (
        <Login />
      ) : (
        <div>
          <h2>Welcome, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <button onClick={logout} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;