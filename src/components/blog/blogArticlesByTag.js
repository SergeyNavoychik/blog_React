import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ItemArticle from './itemArticle'
import Aside from '../common/aside'
import BtnNewArticle from '../common/btnNewArticle'
import FilterArticles from '../blog/filterArticles'
import  {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogAction from '../../actions/blogAction'

export class BlogArticlesByTag extends React.Component{
    constructor(props){
        super(props)

        this.mapArticles = this.mapArticles.bind(this)
    }
    mapArticles( article, i ){
        return < ItemArticle key={i} article={article} />
    }
    
    mapArticles( article, i){
        return < ItemArticle key={i} article={article} />
    }
    render(){
        let { articles } = this.props
        return(
            <div className="container blogPage">
                <h1 className="pageTag">Articles by tag: <span>{ this.props.params.tag }</span></h1>
                <div className="content col-md-8">
                    { articles.map( this.mapArticles )}
                </div>
                <div className="col-md-4">
                    < Aside />
                </div>
            </div>
        )
    }
}
BlogArticlesByTag.propTypes = {
    articles: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired
}
function mapStateToProps (state, ownProps) {
    let tag = ownProps.params.tag,
        articles
    articles = state.blog.articles.filter( article => {
        return article.tags.some( item => { return item == tag })
    })
    return {
        articles
    }
}
function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogArticlesByTag)