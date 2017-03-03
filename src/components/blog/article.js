import React, {PropTypes} from 'react'
import { Link } from  'react-router'
const Article = ( { author, text, createDate, countLikes, countWatch, tags } ) => {
    return(
        <div className="articleWrap">
            <div className="articleHeader">
                <span><i className="fa fa-calendar" />{ createDate.toDateString() }</span>
                <span><i className="fa fa-user" />{ author }</span>
                <span><i className="fa fa-heart" />{ countLikes }</span>
                <span><i className="fa fa-eye" />{ countWatch }</span>
                <span><i className="fa fa-tags" />{ tags }</span>
            </div>
            <p className="articleText">{ text }</p>
        </div>
    )
}
Article.propTypes = {
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    createDate: React.PropTypes.object.isRequired,
    countLikes: React.PropTypes.number.isRequired,
    countWatch: React.PropTypes.number.isRequired,
    tags: React.PropTypes.string.isRequired,
}
export  default Article