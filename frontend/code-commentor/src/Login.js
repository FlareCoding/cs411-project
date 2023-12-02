import React from 'react';

function Login() {
const handleLogin = () => {
    const CLIENT_ID = '349917344619-3qjnujqd3k4sc086v4gq49kb956rtr6u.apps.googleusercontent.com';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/callback');
    const SCOPE = encodeURIComponent('email profile');

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

    window.location.href = oauthUrl;
};

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome to My App</h1>
        <button onClick={handleLogin} style={buttonStyle}>
            Login with OAuth Provider
        </button>
        </div>
    );
}
  
export default Login;