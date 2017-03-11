import React from 'react'
import { browserHistory } from 'react-router'
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogAction from '../../actions/blogAction'
import  FormArticle from './formArticle'

export class EditArticle extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            article: { ...this.props.article, createDate: new Date()  }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    cancel(){
        browserHistory.goBack()
    }
    handleChange(e){
        let article = { ...this.state.article }
        if( e.target.name == 'tags'){
            let arrTags = e.target.value.split(',')
            this.setState( {article: { ...this.state.article, tags: arrTags }})
        }
        else {
            article[e.target.name] = e.target.value
            this.setState( { article } )
        }
    }
    handleSave(){
        let { title, text } = this.state.article
        if( !title || !text){
            this.setState( { ...this.state, error: true } )
            return false
        }
        let article = { ...this.state.article }
        article.tags = article.tags.filter( tag => { return (tag != '') })
        article.tags = article.tags.map( tag => tag.trim())
        this.props.blogActions.saveArticle(article)
        browserHistory.push('/blog')
    }
    render(){
        return(
            <div className="container">
                < FormArticle
                    handleChange={this.handleChange}
                    handleSave={this.handleSave}
                    cancel={this.cancel}
                    article={this.state.article}
                    error={this.state.error}
                />
            </div>
        )
    }
}
EditArticle.propTypes = {
    article: React.PropTypes.object.isRequired
}

function randomId( array, id ) {

    for (var i = 0; i < array.length; i++) {
        if( array[i].id == id ){
            ++id
            i = -1
        }
    }
    return id
}
function mapStateToProps (state, ownProps) {
    let id = ownProps.params.id,
        article = { author: `${state.user.userName} ${state.user.surname}`,
                    title:'', text:'', createDate: new Date(), countLikes: { counts: 0, names: []}, countWatch: 0, tags: []}
    if(id){
       [ article ] = state.blog.articles.filter( article => { return article._id == id })
    }
    return {
        article
    }
}
function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)