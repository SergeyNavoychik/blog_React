import * as types from  '../constants/blog'
import api from '../api/index'


export function uploadImage(data, config, article) {
    return (dispatch) => {
        api.uploadImage( data, config ).then( ( result ) => {
            console.log(result.data)
        } )
    }
}

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
        } )
    }
}

export function saveArticle( article, imageData ) {
    return(dispatch) => {
        if(article._id){
            if ( imageData ){
                api.uploadImage( imageData ).then( ( { data } ) => {
                    let articleNew = { ...article, imageURL: data }
                    api.updateArticle( articleNew ).then( () => {
                        dispatch({
                            type: types.UPDATE_ARTICLE,
                            payload: articleNew
                        })
                    })
                } )
            }
            else {
                api.updateArticle(article).then( () => {
                    dispatch({
                        type: types.UPDATE_ARTICLE,
                        payload: article
                    })
                })
            }
        }
        else{
            api.uploadImage( imageData ).then( ( { data } ) => {
                api.createArticle({ ...article, imageURL: data }).then( ( result ) => {
                    dispatch({
                        type: types.SAVE_ARTICLE,
                        payload: result.data
                    })
                })
            } )
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
        api.updateCountLike( { article, user } ).then( () => {
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