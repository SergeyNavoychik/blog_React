import React from 'react'
import { Link, browserHistory } from 'react-router'
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogAction from '../../actions/blogAction'
import Article from './article'
import Aside from '../common/aside'
import BtnNewArticle from '../common/btnNewArticle'

export class SingleArticle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            popup: null
        }

        this.likeArticle = this.likeArticle.bind(this)
        this.deleteArticle = this.deleteArticle.bind(this)
        this.disableBtn = this.disableBtn.bind(this)
        this.sortArticlesForAside = this.sortArticlesForAside.bind(this)
    }
    componentWillReceiveProps( nextProps ){
        if( nextProps.params.id !== this.props.params.id || nextProps.article._id != this.props.article._id){
            this.props.blogAction.watchArticle( nextProps.article )
        }
    }
    componentDidMount(){
        if(this.props.article._id){
            this.props.blogAction.watchArticle( this.props.article )
        }
    }
    disableBtn(e){
        let author = `${this.props.user.userName} ${this.props.user.surname}`
        if( !this.props.user.isLogin || author != this.props.article.author){
            e.preventDefault()
        }
    }
    likeArticle(e){
        if( !this.props.user.isLogin ) return false
        let arrNames = this.props.article.countLikes.namesWhoLike
        let user = `${this.props.user.userName} ${this.props.user.surname}`
        if(arrNames.length == 0){
            this.props.blogAction.likeArticle( this.props.article, user )
            return false
        }
        let userLikeThisArticle = false
        arrNames.forEach( name => {
            if( name == user) return userLikeThisArticle = true
        })
        if( !userLikeThisArticle) return this.props.blogAction.likeArticle( this.props.article, user )
    }
    deleteArticle(e){
        let author = `${this.props.user.userName} ${this.props.user.surname}`
        if( !this.props.user.isLogin || author != this.props.article.author){
            e.preventDefault()
            return false
        }
        const agreePopup = () => {
            this.props.blogAction.deleteArticle( this.props.article )
            browserHistory.push('/blog')
        }
        const cancelPopup = () => {
            this.setState( { popup: null } )
        }
        let popup = <div className="alertPopup">
                        <p>Delete article? are you sure??</p>
                        <div>
                            <button onClick={agreePopup}>OK</button>
                            <button onClick={cancelPopup}>Cancel</button>
                        </div>
                    </div>
        this.setState( { popup } )
    }
    sortArticlesForAside(articlesForAside){
        articlesForAside.forEach( article => {              //convert string Date to Object Date
            let date = Date.parse(article.createDate)
            article.createDate = new Date(date)
        })
        articlesForAside.sort( (a, b) => { return b.createDate - a.createDate})
    }

    render(){
        let { _id, author, title,text,createDate, countLikes, countWatch, tags } = this.props.article,
            { articlesAll, fetching } = this.props,
            { isLogin, userName, surname } = this.props.user,
            btnClass = !isLogin || author != `${userName} ${surname}` ? 'disabled' : ''
        let date = Date.parse(createDate)
        createDate = new Date(date)
        this.sortArticlesForAside(articlesAll)
        return(
            <div className="container singleArticle">
                { this.state.popup }
                { fetching
                    ? <p className="col-md-8">Fetching....</p>
                    :
                    <div className="col-md-8">
                        <p className="articleTitle">{ title }</p>
                        < Article
                            id={ _id }
                            author={ author }
                            title={ title }
                            text={ text }
                            createDate={ createDate }
                            countLikes={ countLikes }
                            countWatch={ countWatch }
                            tags={ tags }
                        />
                        <button onClick={ this.likeArticle }
                                className={`likeBtn ${ !isLogin && 'disable' }`} >
                            <i className="fa fa-thumbs-up" />
                        </button>
                    </div>
                }
                <div className="col-md-4">
                    <div className="controlsBtn">
                        < BtnNewArticle isLogin={isLogin}/>
                        <Link to={`/blog/updateArticle/${_id}`}
                              className={ btnClass }
                              onClick={this.disableBtn}>
                              Update article
                        </Link>
                        <a href="#" onClick={ this.deleteArticle }
                              className={ btnClass }>
                              Delete article
                        </a>
                    </div>
                    < Aside
                        articles={ articlesAll.slice( 0, 5 ) }
                    />
                </div>
            </div>
        )
    }
}
SingleArticle.propTypes = {
  article: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  articlesAll: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
function mapStateToProps (state, ownProps) {
    let id = ownProps.params.id,
        [article] = state.blog.articles.filter( article => { return article._id == id })
    if(!article) article = {}
    return {
        article,
        fetching: state.blog.fetching,
        articlesAll: [...state.blog.articles],
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)