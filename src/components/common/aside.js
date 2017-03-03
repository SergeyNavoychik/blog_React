import React, {PropTypes} from 'react'
import { Link } from 'react-router'
const Aside = ( { articles } ) => {
    function mapArticles( article, i ) {
        return(
            <li key={i}><Link to={`/blog/article/${ article.id }`}>{ article.title }</Link></li>
        )
    }
    return(
        <aside>
            <h3 className="caption">Latest articles</h3>
            <ul>
                { articles.map( mapArticles ) }
            </ul>
        </aside>
    )
}
Aside.propTypes = {
    articles: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired
}
export  default Aside