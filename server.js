var express = require("express");
var fs = require("fs");
var path = require("path");

var goodNote = require("./db.json");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function(req,res){
    let newNote = req.body;
    goodNote.push(newNote);
    addId();
    let save = JSON.stringify(goodNote);
    fs.writeFileSync("db.json",save)

    res.redirect('back');
});

app.delete("/api/notes/:id", function (req,res) {
    const deleted = goodNote.findIndex((i) => i.id == req.params.id);
    goodNote.splice(deleted, 1);
    reWrite();
    res.json(goodNote);
});