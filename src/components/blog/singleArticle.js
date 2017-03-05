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
    }
    componentWillReceiveProps( nextProps ){
        if( nextProps.params.id !== this.props.params.id ){
            this.props.blogAction.watchArticle( nextProps.article )
        }
    }
    componentWillMount(){
        this.props.blogAction.watchArticle( this.props.article )

    }
    disableBtn(e){
        let author = `${this.props.user.userName} ${this.props.user.surname}`
        if( !this.props.user.isLogin || author != this.props.article.author){
            e.preventDefault()
        }
    }
    likeArticle(){
        this.props.blogAction.likeArticle( this.props.article )
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
    render(){
        let { id, author, title,text,createDate, countLikes, countWatch, tags } = this.props.article,
            {isShowPopup} = this.state,
            { articlesAll } = this.props,
            { isLogin, userName, surname } = this.props.user,
            btnClass = !isLogin || author != `${userName} ${surname}` ? 'disabled' : ''
        articlesAll.sort( (a, b) => { return b.createDate - a.createDate})

        return(
            <div className="container singleArticle">
                { this.state.popup }
                <div className="col-md-8">
                    <p className="articleTitle">{ title }</p>
                    < Article
                        id={ id }
                        author={ author }
                        title={ title }
                        text={ text }
                        createDate={ createDate }
                        countLikes={ countLikes }
                        countWatch={ countWatch }
                        tags={ tags }
                    />
                    <button onClick={ this.likeArticle } className="likeBtn" ><i className="fa fa-thumbs-up" /></button>
                </div>
                <div className="col-md-4">
                    <div className="controlsBtn">
                        < BtnNewArticle isLogin={isLogin}/>
                        <Link to={`/blog/updateArticle/${id}`}
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
        [ article ] = state.blog.articles.filter( article => { return article.id == id })
    return {
        article,
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