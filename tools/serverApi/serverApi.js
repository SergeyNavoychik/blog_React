import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import * as db from './db/dbUtils'
import path from 'path';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );
// Allow requests from any origin
app.use(cors({ origin: '*' }));

//Upload image
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join( __dirname, './photos'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage : storage}).single('image');
app.post('/uploadphoto',(req,res) => {
    upload(req,res,function(err) {
        if(err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        if(!res.req.file) res.send('')
        else res.send(`http://localhost:8080/photos/${res.req.file.filename}`)
    });
});

app.get('/photos/:name', (req, res) => {
    res.sendfile(path.join( __dirname, `./photos/${req.params.name}`))
});

//end upload image

// RESTful api handlers
app.get('/articles', (req, res) => {
    db.listArticles().then(data => res.send(data));
});

app.post('/articles', (req, res) => {
    db.createArticle(req.body).then(data => res.send(data));
});
app.put('/articles', (req, res) => {
    db.updateArticle(req.body).then(data => res.send(data));
});
app.put('/articles/countWatch', (req, res) => {
    db.updateCountWatch(req.body).then(data => res.send(data));
});
app.put('/articles/countLike', (req, res) => {
    db.updateCountLike(req.body).then(data => res.send(data));
});

app.delete('/articles/:id', (req, res) => {
    db.deleteArticle(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080, function() {
    console.log('Server is up and running on port 8080');
});