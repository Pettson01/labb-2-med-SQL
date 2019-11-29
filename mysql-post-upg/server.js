const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const postsFunktioner = require('./routes/posts.js')
const commentsFunktioner = require('./routes/comments.js')
const mysql = require('mysql');

let app = express();

//Bodyparser är kanske onödig
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

// connect to database
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    //Test lägga till
    /*
    var sql = "INSERT INTO posts (title, text, author) VALUES ('Highway to hell is a Good Song!', 'It sure is I Agree', 'Robin Flink')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 post insterted");
    });
    */
});


//Skapar tabellen
/*
  var sql = "CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), text VARCHAR(255), author VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table 'posts' created");
  });

  var sql = "CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, comments0 VARCHAR(255), comments1 VARCHAR(255), comments2 VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table 'comments' created");
  });
*/

//Joinar de tillsammans
/*
var sql = "SELECT posts.title AS title, posts.text AS text, posts.author AS author, comments.comments0 AS comments FROM posts JOIN comments ON users.favorite_product = products.id";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});
*/

//Till post
app.get('/posts', (req, res) =>{
  postsFunktioner.getPosts(req, res);
});

app.post('/posts', (req, res) =>{
  postsFunktioner.addPost(req, res);
});

//till posts/:postId/
app.put('/posts/:postId', (req, res) =>{
  postsFunktioner.updatePost(req, res);
});

app.delete('/posts/:postId', (req, res) =>{
  postsFunktioner.removePost(req, res);
});

//Kommentarer
//till /posts/:postId/comments
app.get('/posts/:postId/comments', (req, res) =>{
  commentsFunktioner.getComments(req, res);
});

app.post('/posts/:postId/comments', (req, res) =>{
  commentsFunktioner.addComment(req, res);
});

//till '/posts/:postId/comments/:commentId'
app.put('/posts/:postId/comments/:commentId', (req, res) =>{
  commentsFunktioner.updateComment(req, res);
});

app.delete('/posts/:postId/comments/:commentId', (req, res) =>{
  commentsFunktioner.removeComment(req, res);
});


app.listen(3000);
