//Declare the required modules
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const {v4 : uuidv4} = require("uuid");
/*fs: File System to read folders*/
//const fs = require("fs");
/*config: Global Variables*/
const config = require("./config");
/*path: Return routes in devices*/
//const path = require("path");
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'stephenhouck',
  password: 'testPassword',
  database: 'Equipment',
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MariaDB:', err);
    return;
  }
  console.log('Connected to MariaDB');
});





//Declare headers Cors
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  //res.header("content-type", "Application/json");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

//enable cors
app.use(allowCrossDomain);
app.use(cors());

//Declare the routes

// Get all the books
app.get("/", (req, res) => {
  const sql = 'SELECT b.name, a.last_name, a.first_name  FROM author a INNER JOIN book b ON a.book_id = b.id;'

  connection.query(sql, (err, results) => {
    if (err) {
      console.log('Error querying books and authors', err);
      res.status(500).json({error: 'failed to fetch the books'});
      return;
    }
    res.status(200).json(results)
  })
});

// Add a book
app.post("/book/:id", (req, res) => {
  console.log(res);
  const name  = req.body;
  console.log(name);
  const sql = 'INSERT INTO book (id, name) VALUES (?, ?)';
  const values = [uuidv4(), name]

});

// Up the server
//cmd to run the server: node index.js
//put in you browser when the server run: http://localhost:3000
app.listen(config.port, () => {
  console.log("Server listening on port 3000");
});