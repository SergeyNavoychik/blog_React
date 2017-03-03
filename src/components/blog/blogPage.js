import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ItemArticle from './itemArticle'
import Aside from '../common/aside'
import BtnNewArticle from '../common/btnNewArticle'
import  {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogAction from '../../actions/blogAction'

export class BlogPage extends React.Component{
    constructor(props){
        super(props)

        this.mapArticles = this.mapArticles.bind(this)
        this.isLogin = this.isLogin.bind(this)
    }
    mapArticles( article, i ){
        return < ItemArticle key={i} article={article} />
    }
    isLogin(e){
        if( !this.props.isLogin ){
            e.preventDefault();
            alert("login")
        }

    }
    render(){
        let { articles, isLogin } = this.props
        articles.sort( (a, b) => { return b.createDate - a.createDate})
        return(
            <div className="container blogPage">
                <div className="content col-md-8">{ articles.map( this.mapArticles ) }</div>
                <div className="col-md-4">
                    <div className="controlsBtn">
                        < BtnNewArticle isLogin={isLogin}/>
                    </div>
                    < Aside articles={ articles.slice( 0, 5 ) } />
                </div>
            </div>
        )
    }
}
BlogPage.propTypes = {
  articles: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired
}
function mapStateToProps (state) {
    return {
        articles: [...state.blog.articles],
        isLogin: state.user.isLogin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)