const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',   // Replace with your MySQL username
    password: 'Ayan@1012', // Replace with your MySQL password
    database: 'mycode' // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database.');
});

// Define a route to fetch data
app.get('/api/customers', (req, res) => {
    const sql = 'SELECT * FROM Customers'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
