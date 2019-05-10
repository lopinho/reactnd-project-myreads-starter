import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

/*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
*/


class Search extends React.Component {

    getShelf = (book) => {
        if(book.id in this.props.myBooks) {
            return this.props.myBooks[book.id].shelf
        }
        return 'none'
    }

    render () {
        const {updateShelf} = this.props,
            searchResults = this.props.searchResults || []
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.props.searchBook(e.target.value)}
                        />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                        {searchResults.hasOwnProperty('error') ?
                            searchResults.error :
                            searchResults.map((book) => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    shelf={this.getShelf(book)}
                                    updateShelf={updateShelf}
                                />
                            ))
                        }
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
