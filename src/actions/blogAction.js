import * as types from  '../constants/blog'

export function saveArticle(article) {
    return{
        type: types.SAVE_ARTICLE,
        payload: article
    }
}
export function deleteArticle(object) {
    return{
        type: types.DELETE_ARTICLE,
        payload: object
    }
}
export function likeArticle(object) {
    return{
        type: types.LIKE_ARTICLE,
        payload: object
    }
}
export function watchArticle(article) {
    return{
        type: types.WATCH_ARTICLE,
        payload: article
    }
}