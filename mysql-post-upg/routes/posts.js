const mysql = require('mysql');
const express = require('express');
let app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

module.exports = {
  getPosts(req, res) {

    con.connect(function(err) {
      if (err) throw err;
        con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
      });
    });
  },
  addPost(req, res) {
    let titleA = req.body.title.toString();
    let textA = req.body.text.toString();
    let authorA = req.body.author.toString();

    //console.log(JSON.stringify(newPosts))

    var sql = "INSERT INTO posts (title, text, author) VALUES ('" + titleA + "', '" + textA + "', '" + authorA + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 post insterted");
    });

    res.status(201).send("1 Post Insterted");

  },
  updatePost(req, res) {

/*
    let titleA = req.body.title.toString();
    let textA = req.body.text.toString();
    let authorA = req.body.author.toString();
*/
    var sql = "UPDATE posts SET text = '" + textA + "' WHERE title = '" + req.params.postId +"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " text(s) updated");
    });

    var sql = "UPDATE posts SET author = '" + authorA + "' WHERE title = '" + req.params.postId +"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " author(s) updated");
    });

    res.status(200).send("Table updated");
  },
  removePost(req, res) {

    var sql = "DELETE FROM posts WHERE title = '" + req.params.postId + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of posts deleted: " + result.affectedRows);
    });

    res.status(204).send();

  }
};
