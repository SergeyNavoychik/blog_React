import * as types from  '../constants/user'

export function logIn() {
    return ( dispatch ) => {
        gapiAuth2.signIn()
            .then( data => {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: data
                })
            } )
    }
}
export function logOut() {
    return ( dispatch ) => {
        gapiAuth2.signOut()
            .then( () => {
                dispatch({
                    type: types.LOGOUT_SUCCESS
                })
            } )
    }
}