import React from 'react'


function book (props) {
    const thumbnail = props.book.imageLinks && (props.book.imageLinks.smallThumbnail || props.book.imageLinks.thumbnail) || ''
    const { title, authors, shelf } = props.book
    const options = [
        {name: "Currently Reading", id: "currentlyReading"},
        {name: "Want to Read", id: "wantToRead"},
        {name: "Read", id: "read"},
        {name: "None", id: "none"},
    ];

    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf || 'none'} onChange={(e) => (props.updateShelf(props.book, e.target.value))}>
                        <option value="move" disabled>Move to...</option>
                        {options.map( (item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="book-title">{ title }</div>
            <div className="book-authors">
                { authors ?
                  authors.map( (author, i) => (
                    <span key={i}>{author}<br/></span>
                  )):
                        'N/A'
                }
            </div>
        </div>

    )
}

export default book
