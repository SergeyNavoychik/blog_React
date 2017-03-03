import React, {PropTypes} from 'react'
import 'bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import Header from './common/header'
export default class App extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                { this.props.children }
            </div>
        )
    }
}
App.propTypes = {
    children: PropTypes.object.isRequired
}