import React from 'react'
import { Link } from 'react-router'
import UserLoginForm from './userLogin'
import  { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from '../../../actions/userAction'

export class User extends React.Component{
    constructor(props){
        super(props)

        this.logOut = this.logOut.bind(this)
        this.logIn = this.logIn.bind(this)
    }
    logOut(){
        this.props.userActions.logOut()
    }
    logIn(){
        this.props.userActions.logIn()
    }
    render(){
        let { userName, avatarUrl, isLogin } = this.props.user
        return(
            <UserLoginForm
                userName={ userName }
                avatarUrl={ avatarUrl }
                isLogin={ isLogin }
                logIn={ this.logIn }
                logOut={ this.logOut }
            />
        )
    }
}
User.propTypes = {

}
function mapStateToProps (state) {
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
    userActions: bindActionCreators(userAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)