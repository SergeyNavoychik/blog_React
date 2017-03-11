import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    author: { type: String },
    title: { type: String },
    text: { type: String },
    createDate: { type: String},
    countLikes: {counts: { type: Number}, namesWhoLike: [ String ] },
    countWatch: { type: Number},
    tags: [ String ]
})
const Article = mongoose.model( 'Article', ArticleSchema)