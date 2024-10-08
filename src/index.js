// src/index.js

import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(express.static('public')); // For serving static files like CSS

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ayan@1012",
    database: "mycode"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to fetch transcription data
app.get('/api/transcriptions', (req, res) => {
    const sql = 'SELECT * FROM transcriptions';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Route to search transcriptions by spoken words
app.get('/api/search-transcriptions', (req, res) => {
    const { query } = req.query;
    const sql = 'SELECT * FROM transcriptions WHERE customer_transcription LIKE ?';
    const searchQuery = `%${query}%`;

    db.query(sql, [searchQuery], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});



// // Route to handle updating comments
// app.post('/api/update-comment', (req, res) => {
//     const { transcription_id, comment } = req.body;

//     const sql = 'UPDATE transcriptions SET comment = ? WHERE id = ?';
//     db.query(sql, [comment, transcription_id], (err, result) => {
//         if (err) {
//             return res.status(500).send('Error updating comment: ' + err);
//         }
//         res.send('Comment updated successfully');
//     });
// });

app.listen(process.env.PORT, () => {
    console.log(`⚙️  Server is running at port: ${process.env.PORT}`);
});
