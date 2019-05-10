import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class ListBooks extends React.Component {

    buildShelf = (shelfID, shelfName) => {
        const books = (
            this.props.shelfs.hasOwnProperty(shelfID) ?
            this.props.shelfs[shelfID].map((bookID) => (
                <li key={bookID}>
                    <Book
                        book={this.props.books[bookID]}
                        updateShelf={this.props.updateShelf}
                        shelf={shelfID}
                    />
                </li>
            )):
            'No books in this shelf'
        )
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.loading ?
                            'LOADING ...':
                            books
                        }
                    </ol>
                </div>
            </div>
        )
    }

    render () {
        const readingShelf = this.buildShelf('currentlyReading', 'Currently Reading')
        const wantShelf = this.buildShelf('wantToRead', 'Want to Read')
        const readShelf = this.buildShelf('read', 'Read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {readingShelf}
                    {wantShelf}
                    {readShelf}
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                        onClick={(e) => this.props.clearSearch()}
                    ><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;
