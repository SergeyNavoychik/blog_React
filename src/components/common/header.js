import React, {PropTypes} from 'react'
import { Link, IndexLink } from 'react-router'
import User from './user/user'
const Header = () => {
    return(
        <header>
            <div className="container">
                <nav className="col-md-8">
                    < IndexLink to="/" activeClassName="active" > Home </IndexLink>
                    < Link to="/blog" activeClassName="active" > Blog </Link>
                </nav>
                < User />
            </div>
        </header>
    )
}
export  default Header