import * as types from '../constants/blog'
//import initialState  from './initialState'
export default function ( state = {articles:[], fetching: false}, action) {

    switch(action.type){
        case types.SAVE_ARTICLE:
            console.log(action.payload)
            return {...state, articles: [...state.articles, action.payload]}
        case types.LOAD_ARTICLE:
            return {...state, fetching: true}
        case types.LOAD_ARTICLE_SUCCESS:
            return {...state, articles: [...action.payload], fetching: false}
        case types.DELETE_ARTICLE:
            return {...state, articles: [...state.articles.filter( article => { return article._id != action.payload._id } )] }
        case types.UPDATE_ARTICLE:
            return {...state, articles: [...state.articles.filter( article => { return article._id != action.payload._id } ),
                                        action.payload] }
        case types.LIKE_ARTICLE:
            let counts = action.payload.article.countLikes.counts + 1
            let namesWhoLike = [...action.payload.article.countLikes.namesWhoLike, action.payload.user ]
            return { ...state, articles: [...state.articles.filter( article => { return article._id != action.payload.article._id }),
                                          {...action.payload.article, countLikes: { counts, namesWhoLike}}]}
        case types.WATCH_ARTICLE:
            return { ...state, articles: [...state.articles.filter( article => { return article._id != action.payload._id }),
                                           {...action.payload, countWatch: action.payload.countWatch + 1 } ]}
        default:
            return state
    }
}