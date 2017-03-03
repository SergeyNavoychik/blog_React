import * as types from '../constants/user'
import initialState  from './initialState'
export default function ( state = initialState.user, action) {

    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {...state, isLogin: true, avatarUrl: action.payload.w3.Paa,
                        userName: action.payload.w3.ofa, surname: action.payload.w3.wea }
        case types.LOGOUT_SUCCESS:
            return {...state, isLogin: false, avatarUrl: '', userName: '', surname: '' }
        default:
            return state
    }
}