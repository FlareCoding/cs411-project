export const saveRepoToDatabase = async (repoUrl, name, email) => {
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

    //const data = await response.json(); // Assuming your server responds with JSON data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const deleteRepoFromDatabase = async (repoUrl, email) => {
  try {
    const params = {
      repoLink: repoUrl,
      email: email
    };
    
    const response = await fetch('http://localhost:4000/api/remove_repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    //const data = await response.json(); // Assuming your server responds with JSON data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const getReposForUserByEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:4000/api/get_repos_for_user?email=${email}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Assuming your server responds with JSON data
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
};
