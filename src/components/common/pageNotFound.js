import React, {PropTypes} from 'react'
import { Link } from 'react-router'
const PageNotFound = () => {
    return(
            <div className="row">
                <div className="text-center col-sm-12">
                    <h1 className="ops"> Oops!!!</h1>
                    <div className="numError">
                        <span className="col-sm-6">404</span>
                        <div className="col-sm-6">
                            <p className="er">ERROR</p>
                            <p className="notFound">PAGE NOT FOUND</p>
                        </div>
                    </div>
                    <p className="notFoundSorry"> Sorry, that page doesn’t exist! Return to the <Link to="/">HOMEPAGE</Link></p>
                </div>
            </div>
    )
}
export  default PageNotFound