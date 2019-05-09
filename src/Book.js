import React from 'react'


function book (props) {
    const thumbnail = props.book.imageLinks.smallThumbnail || props.book.imageLinks.thumbnail
    console.log(thumbnail)
    const { title, authors, shelf } = props.book
    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" selected={ shelf === "currentlyReading" }>Currently Reading</option>
                        <option value="wantToRead" selected={ shelf === "wantToRead" }>Want to Read</option>
                        <option value="read" selected={ shelf === "read" }>Read</option>
                        <option value="none" selected={ shelf === null }>None</option>
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
