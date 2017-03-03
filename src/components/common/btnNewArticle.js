import React, {PropTypes} from 'react'
import { Link } from 'react-router'
const BtnNewArticle = ( { isLogin } ) => {
    let btnClass = isLogin ? '' : 'disabled'
    function disableBtn(e) {
        isLogin ? null : e.preventDefault()
    }
    return(
        <Link to="/blog/newArticle"
              className={ btnClass }
              onClick={ disableBtn }>
            Add new article
        </Link>
    )
}
BtnNewArticle.propTypes = {
    isLogin: React.PropTypes.bool.isRequired
}
export  default BtnNewArticle