import React, {PropTypes} from 'react'
import  Input from '../common/Input'
const FormArticle = ( { handleChange, handleSave, cancel, article, error } ) => {

    return(
        <div className="editForm col-md-8 col-md-push-2">
            <Input value={article.title}
                   handleChange={ handleChange }
                   error={ error }
                   name="title"
                   label="Title"
            />
            <div className="textArea">
                <label>Text
                    <textarea value={ article.text }
                              onChange={ handleChange }
                              name="text"
                              className={ error && !article.text ? 'has-error' : null }
                              rows="10"
                    />
                </label>
                { error && !article.text && <span className="error">This field is required</span>}
            </div>
            <Input value={ article.tags }
                   handleChange={ handleChange }
                   name="tags"
                   label="Tags"
            />
            <button onClick={handleSave} className="btnEditForm">Save</button>
            <button onClick={ cancel } className="btnEditForm">Cancel</button>
        </div>
    )
}
FormArticle.propTypes = {
    article: React.PropTypes.object.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    handleSave: React.PropTypes.func.isRequired
}
export  default FormArticle