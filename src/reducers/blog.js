import * as types from '../constants/blog'
import initialState  from './initialState'
export default function ( state = initialState.blog, action) {

    switch(action.type){
        case types.SAVE_ARTICLE:
            return {...state, articles: [...state.articles.filter( article => { return article.id != action.payload.id }),
                                            action.payload]}
        case types.DELETE_ARTICLE:
            return {...state, articles: [...state.articles.filter( article => { return article.id != action.payload.id } )] }
        case types.LIKE_ARTICLE:
            return { ...state, articles: [...state.articles.filter( article => { return article.id != action.payload.id }),
                                           {...action.payload, countLikes: action.payload.countLikes + 1 } ]}
        case types.WATCH_ARTICLE:
            return { ...state, articles: [...state.articles.filter( article => { return article.id != action.payload.id }),
                                           {...action.payload, countWatch: action.payload.countWatch + 1 } ]}
        default:
            return state
    }
}