import React, {PropTypes} from 'react'
const Input = ( { value, handleChange, error, label, name } ) => {
    let inputClass = error && !value ? 'has-error' : null
    return(
        <div className="textInput">
            <label >{label}
                <input name={name}
                       value={value}
                       onChange={handleChange}
                       className={inputClass}
                />
            </label>
            { error && !value && <span className="error">This field is required</span>}
        </div>
    )
}
Input.propTypes = {
    value: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    error: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired
}
export  default Input