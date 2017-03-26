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
            article: { ...this.props.article, createDate: new Date()  },
            imageData: {},
            previewImg:''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.cancel = this.cancel.bind(this)
        this.previewImg = this.previewImg.bind(this)
    }
    cancel(){
        browserHistory.goBack()
    }
    previewImg(){
        let file = document.querySelector('#uploadImage').files[0]
        let reader  = new FileReader()
        reader.onloadend = () => {
            this.setState( { previewImg: reader.result })
        }
        if (file) {
            reader.readAsDataURL(file)
        } else {
            this.setState( { previewImg: '' })
        }
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
        if( e.target.name == 'image' ){
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            let fileData = new FormData();
            fileData.append("image", e.target.files[0]);
            this.setState( { imageData: { config, fileData }, article: { ...this.state.article, imageURL: '' } })
            this.previewImg()
        }
    }
    handleSave(){
        let { title, text } = this.state.article
        if( !title || !text){
            this.setState( { error: true } )
            return false
        }
        let article = { ...this.state.article }
        let { config = {}, fileData = false} = this.state.imageData
        article.tags = article.tags.map( tag => tag.trim())
        article.tags = article.tags.filter( tag => { return (tag != '') })
        this.props.blogActions.saveArticle(article, fileData, config)
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
                    previewImg={this.state.previewImg}
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
                    title:'', text:'', createDate: new Date(), countLikes: { counts: 0, names: []},
                    countWatch: 0, tags: [], imageURL: ''}
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