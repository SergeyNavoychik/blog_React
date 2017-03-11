import React, {PropTypes} from 'react'
import { Link } from  'react-router'
const Article = ( { author, text, createDate, countLikes, countWatch, tags } ) => {
    function mapTags( tag, i ){
        return <Link to={`/blog/tag/${ tag }`} key={i} className="tagLink">{ tag }</Link>
    }
    return(
        <div className="articleWrap">
            <div className="articleHeader">
                <span><i className="fa fa-calendar" />{ createDate.toDateString() }</span>
                <span><i className="fa fa-user" />{ author }</span>
                <span><i className="fa fa-heart" />{ countLikes.counts }</span>
                <span><i className="fa fa-eye" />{ countWatch }</span>
                <span><i className="fa fa-tags" />
                    { tags.slice(0, 3).map( (mapTags))}
                    {tags.length > 3 && <i>...</i>}
                </span>
            </div>
            <p className="articleText">{ text }</p>
        </div>
    )
}
Article.propTypes = {
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    createDate: React.PropTypes.object.isRequired,
    countLikes: React.PropTypes.object.isRequired,
    countWatch: React.PropTypes.number.isRequired,
    tags: React.PropTypes.array.isRequired,
}
export  default Article