import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import * as db from './db/dbUtils'

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );
// Allow requests from any origin
app.use(cors({ origin: '*' }));
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