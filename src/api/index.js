import axios from 'axios'
export default{
    /* upload in folder
    uploadImage(data, config) {
        return axios.post( 'http://localhost:8080/uploadphoto', data, config)
    },*/
    uploadImage(data) {
        return axios.post( 'http://localhost:8080/uploadimage', data)
    },
    listArticles(){
        return axios.get( 'http://localhost:8080/articles')
    },
    createArticle(data){
        return axios.post( 'http://localhost:8080/articles', data)
    },
    updateArticle(data){
        return axios.put( 'http://localhost:8080/articles', data)
    },
    updateCountWatch(data){
        return axios.put( 'http://localhost:8080/articles/countWatch', data)
    },
    updateCountLike(data){
        return axios.put( 'http://localhost:8080/articles/countLike', data)
    },
    deleteArticle(articleId){
        return axios.delete( `http://localhost:8080/articles/${articleId}`)
    }
}