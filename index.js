const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());

// Constants
const BOARD_TABLE = 'board';
const BOARD_ID = 1;

// SQLite database connection
const db = new sqlite3.Database('./database.sqlite');

// Table creation
db.run(`CREATE TABLE IF NOT EXISTS ${BOARD_TABLE} (
    id INTEGER PRIMARY KEY,
    pos1 TEXT,
    pos2 TEXT, 
    pos3 TEXT, 
    pos4 TEXT,
    pos5 TEXT, 
    pos6 TEXT,
    pos7 TEXT,
    pos8 TEXT,  
    pos9 TEXT
)`);

// Root path handler
app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Get the current state of the board
app.get('/board', (req, res) => {
    db.get(`SELECT * FROM ${BOARD_TABLE} WHERE id = ${BOARD_ID}`, (err, row) => {
        if (err) {
            console.error(`Error getting board: ${err.message}`);
            res.status(500).send(`Error getting board: ${err.message}`);
        } else {
            res.json(row);
        }
    });
});

// Handle player moves
app.post('/play', (req, res) => {
    const pos = req.body.pos;
    const symbol = req.body.symbol;

    if (pos < 1 || pos > 9) {
        return res.status(400).send('Invalid position');
    }

    // Update the specified position on the board
    const query = `UPDATE ${BOARD_TABLE} SET pos${pos} = ? WHERE id = ${BOARD_ID}`;

    db.run(query, [symbol], (err) => {
        if (err) {
            return res.status(500).send(`Error updating board: ${err.message}`);
        }

        // Get the updated state of the board
        db.get(`SELECT * FROM ${BOARD_TABLE} WHERE id = ${BOARD_ID}`, (err, updatedBoard) => {
            if (err) {
                return res.status(500).send(`Error getting updated board: ${err.message}`);
            }

            res.json(updatedBoard);
        });
    });
});

// Reset the board to initial state
app.post('/reset', (req, res) => {
    // Update all positions to NULL for the specified board
    db.run(`UPDATE ${BOARD_TABLE} SET 
        pos1=NULL, pos2=NULL, pos3=NULL, pos4=NULL, pos5=NULL, 
        pos6=NULL, pos7=NULL, pos8=NULL, pos9=NULL 
        WHERE id = ${BOARD_ID}`, (err) => {
        if (err) {
            return res.status(500).send(`Error resetting board: ${err.message}`);
        }

        res.send('Board reset');
    });
});