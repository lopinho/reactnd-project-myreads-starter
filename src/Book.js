import React from 'react'


function book (props) {
    const thumbnail = props.book.imageLinks.smallThumbnail || props.book.imageLinks.thumbnail
    const { title, authors, shelf } = props.book
    const shelves = [
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
                    <select>
                        <option value="move" disabled>Move to...</option>
                        {shelves.map( (item) => (
                            <option key={item.id} value={item.id} selected={shelf === item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="book-title">{ title }</div>
            <div className="book-authors">
            { authors.map( (author, i) => (
                <span key={i}>{author}<br/></span>
            ))}
            </div>
        </div>

    )
}

export default book
