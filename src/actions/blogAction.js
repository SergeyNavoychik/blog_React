import * as types from  '../constants/blog'
import api from '../api/index'


export function loadArticles() {

    return (dispatch) => {
        dispatch({
            type: types.LOAD_ARTICLE
        })
        api.listArticles().then( ( result ) => {
            dispatch({
                type: types.LOAD_ARTICLE_SUCCESS,
                payload: result.data
            })
            console.log("load")
        } )
    }
}

export function saveArticle(article) {
    return(dispatch) => {
        if(article._id){
            api.updateArticle(article).then( () => {
                dispatch({
                    type: types.UPDATE_ARTICLE,
                    payload: article
                })
            })
        }
        else{
            api.createArticle(article).then( ( result ) => {
                dispatch({
                    type: types.SAVE_ARTICLE,
                    payload: result.data
                })
            })
        }
    }
}

export function deleteArticle(article) {
    return(dispatch) => {
        api.deleteArticle(article._id).then( () => {
            dispatch({
                type: types.DELETE_ARTICLE,
                payload: article
            })
        })

    }
}
export function likeArticle(article, user) {
    return(dispatch) => {
        api.updateCountLike( { article, user } ).then( (res) => {
            console.log(res)
            dispatch({
                type: types.LIKE_ARTICLE,
                payload: {
                    article,
                    user
                }
            })
        })

    }
}
export function watchArticle(article) {
    return(dispatch) => {
        api.updateCountWatch(article).then( () => {
            dispatch({
                type: types.WATCH_ARTICLE,
                payload: article
            })
        })

    }
}