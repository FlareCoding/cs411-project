const express = require('express');
const app = express();

// working with the data base
app.get('/users', (req, res) => {
  db.query('SELECT * FROM new_user_repositories', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// starts server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

