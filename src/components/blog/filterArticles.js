import React, {PropTypes} from 'react'
const FilterArticles = ( { handleChangeFilter, allAuthors } ) => {
    return(
        <div className="col-md-12">
            <input type="text"
                   name="searchValue"
                   placeholder="search article..."
                   className="searchInput"
                   onChange={ handleChangeFilter }
            />
            <select name="sortByAuthor"
                    onChange={ handleChangeFilter }
                    className="selectAuthor"
            >
                <option value="allAuthors" default>All authors</option>
                { allAuthors.map( ( item, i ) => {
                    return <option key={i} value={item} >{ item }</option>
                } )}
            </select>
        </div>
    )
}
FilterArticles.propTypes = {
    handleChangeFilter: React.PropTypes.func.isRequired,
    allAuthors: React.PropTypes.array.isRequired
}
export  default FilterArticles