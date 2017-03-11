import React, {PropTypes} from 'react'
import 'bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import Header from './common/header'
import Footer from './common/footer'
export default class App extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <div className="mainContent">
                    { this.props.children }
                </div>
                <Footer/>
            </div>
        )
    }
}
App.propTypes = {
    children: PropTypes.object.isRequired
}