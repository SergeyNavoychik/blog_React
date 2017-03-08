import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ItemArticle from './itemArticle'
import Aside from '../common/aside'
import BtnNewArticle from '../common/btnNewArticle'
import FilterArticles from '../blog/filterArticles'
import  {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogAction from '../../actions/blogAction'

export class BlogPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filterArticles: {
                searchValue: '',
                sortByAuthor: 'allAuthors'
            }
        }
        this.mapArticles = this.mapArticles.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)
        this.filterArticles = this.filterArticles.bind(this)
        this.sortArticlesForAside = this.sortArticlesForAside.bind(this)
    }
    mapArticles( article, i ){
        return < ItemArticle key={i} article={article} />
    }
    handleChangeFilter(e){
        let filterArticles = { ...this.state.filterArticles }
        filterArticles[e.target.name] = e.target.value
        this.setState( { filterArticles })

    }
    filterArticles(articles){
        let searchValue = this.state.filterArticles.searchValue.toLowerCase(),
            sortByAuthor = this.state.filterArticles.sortByAuthor
        articles.forEach( article => {              //convert string Date to Object Date
            let date = Date.parse(article.createDate)
            article.createDate = new Date(date)
        })
        articles.sort( (a, b) => { return b.createDate - a.createDate})  //sort by date
        if( searchValue ){
            articles = articles.filter( article => {                         //search articles by title and text
                return ( article.title.toLowerCase().includes( searchValue ) ||
                article.text.toLowerCase().includes( searchValue ) ) } )
        }
        if(this.state.filterArticles.sortByAuthor != 'allAuthors'){
            articles = articles.filter( article => { return article.author == sortByAuthor}) //sort by author
        }
        return articles
    }
    sortArticlesForAside(articlesForAside){
        articlesForAside.forEach( article => {              //convert string Date to Object Date
            let date = Date.parse(article.createDate)
            article.createDate = new Date(date)
        })
        articlesForAside.sort( (a, b) => { return b.createDate - a.createDate})
    }
    render(){
        let { articles, isLogin, articlesForAside, arrayAuthors } = this.props
        this.sortArticlesForAside(articlesForAside)
        articles = this.filterArticles( articles )
        return(
            <div className="container blogPage">
                <FilterArticles
                    handleChangeFilter={this.handleChangeFilter}
                    allAuthors={arrayAuthors}
                />
                <div className="content col-md-8">
                    {   articles.length > 0
                        ? articles.map( this.mapArticles )
                        : <p className="noResults">Sorry, no results were found.</p>
                    }
                </div>
                <div className="col-md-4">
                    <div className="controlsBtn">
                        < BtnNewArticle isLogin={isLogin}/>
                    </div>
                    < Aside articles={ articlesForAside.slice( 0, 5 ) } />
                </div>
            </div>
        )
    }
}
BlogPage.propTypes = {
  articles: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired,
  articlesForAside: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired,
  arrayAuthors: React.PropTypes.array.isRequired
}
function mapStateToProps (state) {
    function getAllAuthors( array ) {
        let arrayAuthors = []
        for ( let q = 0; q < array.length; ++q){
            if(q==0){
                arrayAuthors.push(array[q].author)
            }
            for ( let j = 0; j < arrayAuthors.length; ++j){
                if(array[q].author == arrayAuthors[j]){
                    break
                }
                if(j == arrayAuthors.length-1){
                    arrayAuthors.push(array[q].author)
                }
            }
        }
        return arrayAuthors
    }
    return {
        articles: [...state.blog.articles],
        isLogin: state.user.isLogin,
        articlesForAside: [...state.blog.articles],
        arrayAuthors: getAllAuthors(state.blog.articles)
    }
}
function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)