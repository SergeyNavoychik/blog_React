import mongoose from 'mongoose'
import  './articles'

const Article = mongoose.model( 'Article')
mongoose.Promise = Promise
export  function setUpConnection() {
    mongoose.connect('mongodb://localhost/blog')
}

export function listArticles() {
    return Article.find()
}
export function createArticle(data) {
    const article = new Article({
        author: data.author,
        title: data.title,
        text: data.text,
        createDate: data.createDate,
        countLikes: { counts: data.countLikes.counts, namesWhoLike: data.countLikes.names },
        countWatch: data.countWatch,
        tags: data.tags,
        imageURL: data.imageURL
    })
    return article.save()
}
export function updateArticle(data) {
    return Article.findById(data._id, (err, article) => {
        article.author = data.author
        article.title = data.title
        article.text = data.text
        article.createDate = data.createDate
        article.countLikes = data.countLikes
        article.countWatch = data.countWatch
        article.tags = data.tags
        article.imageURL = data.imageURL
        article.save();
    })
}
export function updateCountWatch(data) {
    return Article.findById(data._id, (err, article) => {
        article.countWatch = data.countWatch + 1
        article.save();
    })
}
export function updateCountLike(data) {
    return Article.findById(data.article._id, (err, article) => {
        article.countLikes.counts = data.article.countLikes.counts + 1
        article.countLikes.namesWhoLike = [...data.article.countLikes.namesWhoLike, data.user]
        article.save();
    })
}

export function deleteArticle(noteId) {
    return Article.findById(noteId).remove()
}