mapping(item, i){
    return (
        <li key={i}>
            <p >{item.toLocaleDateString()}</p>
            <hr/>
            <ul>
                {this.props.user.buying.map( ( day, id ) => {
                    if ( day.date == item.getDate())
                        return (
                            <li key={id}>{day.item}</li>
                        )
                })}
            </ul>

        </li>
    )
}