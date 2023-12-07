const saveRepoToDatabase = async (repoUrl, name, email) => {
  try {
    const params = {
      repoLink: repoUrl,
      name: name,
      email: email
    };
    
    const response = await fetch('http://localhost:4000/api/update_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Assuming your server responds with JSON data
    console.log('Response from server:', data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export default saveRepoToDatabase;
