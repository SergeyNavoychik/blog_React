import React, {PropTypes} from 'react'
const UserLoginForm = ( {  userName, avatarUrl, isLogin, logIn, logOut } ) => {
    return(
        <div className="col-sm-4 text-right">
            { isLogin
                ?
                <div className="user">
                    <img src={avatarUrl} className="userAvatar" alt=""/>
                    <span className="userHello">Hello, { userName }</span>
                    <button className="btnLog" onClick={logOut}>Log out</button>
                </div>
                :
                <button className="btnLog" onClick={logIn}>Log in</button>
            }
        </div>
    )
}
UserLoginForm.propTypes = {
    userName: React.PropTypes.string,
    avatarUrl: React.PropTypes.string,
    isLogin: React.PropTypes.bool.isRequired,
    logIn: React.PropTypes.func.isRequired,
    logOut: React.PropTypes.func.isRequired
}
export  default UserLoginForm