import React from 'react'
import { Link } from 'react-router'
import  { connect } from 'react-redux'

export class Aside extends React.Component{
    constructor(props){
        super(props)

        this.mapArticles = this.mapArticles.bind(this)
        this.mapTags = this.mapTags.bind(this)
        this.sortArticlesForAside = this.sortArticlesForAside.bind(this)
    }
    mapArticles( article, i ) {
        return(
            <li key={i}><Link to={`/blog/article/${ article._id }`}>{ article.title }</Link></li>
        )
    }
    mapTags( tag, i ){
        return(
            <li key={i}><Link to={`/blog/tag/${ tag }`} className="tagCloud" >{tag}</Link></li>
        )
    }
    sortArticlesForAside(articles){
        articles.forEach( article => {
            let date = Date.parse(article.createDate)
            article.createDate = new Date(date)
        })
        articles.sort( (a, b) => { return b.createDate - a.createDate})
    }
    render(){
        let { articles, allTags } = this.props
        this.sortArticlesForAside(articles)
        return(
            <aside>
                <h3 className="caption">Latest articles</h3>
                <ul>
                    { articles.slice( 0, 5 ).map( this.mapArticles ) }
                </ul>
                <h3 className="caption">Tags</h3>
                <ul className="tags">
                    { allTags.map(this.mapTags) }
                </ul>
            </aside>
        )
    }
}
Aside.propTypes = {
  articles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
function mapStateToProps (state) {
    let allTags = []
    state.blog.articles.forEach( article => {
        article.tags.forEach( tag => {
            if( allTags.every( item => item != tag ) ){
                allTags.push(tag)
            }
        })
    })
    return {
        articles: [ ...state.blog.articles],
        allTags
    }
}


export default connect(mapStateToProps)(Aside)