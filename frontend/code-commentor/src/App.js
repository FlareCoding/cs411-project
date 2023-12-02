import React, { useEffect } from 'react';
import Login from './Login';

function App() {
  useEffect(() => {
    // Parse the URL to check for OAuth callback data
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1)); // Remove the '#' part
      const accessToken = params.get('access_token');

      if (accessToken) {
        // Handle the access token (store it, fetch user data, etc.)
        console.log('Access Token:', accessToken);
      }
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
