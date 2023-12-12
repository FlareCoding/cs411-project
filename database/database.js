// for the connection to the database
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'giannasfrisi@gmail.com', 
    password: 'JosieandAriel123!', 
    database: 'codecommentordatabase'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

module.exports = {
    connection
};
