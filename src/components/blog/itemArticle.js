import React, { PropTypes } from 'react'
import Article from './article'
import { Link } from 'react-router'
const ItemArticle = ( {article } ) => {
    return(
       <div className="itemArticle">
           <Link to={`/blog/article/${ article._id }`}>{ article.title }</Link>
           <Article id={article.id}
                    author={article.author}
                    title={article.title}
                    text={ `${ article.text.substring( 0, 400 ) }...` }
                    createDate={article.createDate}
                    countLikes={article.countLikes}
                    countWatch={article.countWatch}
                    tags={article.tags}
           />
           <Link to={`/blog/article/${ article._id }`}  className="readMore" > Read more </Link>
       </div>
    )
}
ItemArticle.propTypes = {
    article: React.PropTypes.object.isRequired
}
export  default ItemArticle