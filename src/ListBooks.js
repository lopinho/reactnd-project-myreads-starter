import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class ListBooks extends React.Component {
    render () {
        const { books, updateShelf, loading } = this.props
        const reading = (books && books.filter((book) => ( book.shelf === "currentlyReading" ))) || [];
        const want = (books && books.filter((book) => ( book.shelf === "wantToRead" ))) || [];
        const read = (books && books.filter((book) => ( book.shelf === "read" ))) || [];

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading ?
                                        'LOADING ...':
                                        reading.map( (book, i) => (
                                            <li key={i}>
                                                <Book
                                                    updateShelf={updateShelf}
                                                    book={book}
                                                />
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading ?
                                        'LOADING ..':
                                        want.map( (book, i) => (
                                            <li key={i}>
                                                <Book
                                                    updateShelf={updateShelf}
                                                    book={book}
                                                />
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {loading ?
                                        'LOADING ..':
                                        read.map( (book, i) => (
                                            <li key={i}>
                                                <Book
                                                    updateShelf={updateShelf}
                                                    book={book}
                                                />
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search"><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;
