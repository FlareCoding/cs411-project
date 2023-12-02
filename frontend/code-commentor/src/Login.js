import React from 'react';

function Login() {
const handleLogin = () => {
    const CLIENT_ID = '349917344619-3qjnujqd3k4sc086v4gq49kb956rtr6u.apps.googleusercontent.com';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/callback');
    const SCOPE = encodeURIComponent('email profile');

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

    window.location.href = oauthUrl;
};

return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to My App</h1>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Login with OAuth Provider
            </button>
        </div>
    </div>
);
}
  
export default Login;