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

    state = {
        query: ''
    }

    getShelf = (book) => {
        if(book.id in this.props.books) {
            return this.props.books[book.id].shelf
        }
        return 'none'
    }

    updateQuery = (event) => {
        const value = event.target.value
        this.setState({query: value})
        this.props.searchBook(value)
    }

    render () {

        const {updateShelf} = this.props
        const searchResults = this.props.searchResults || []

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        <input
                            value={this.state.query}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.updateQuery}
                        />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.props.loading? <h3>LOADING ...</h3>:''}
                    {searchResults.hasOwnProperty('error') ?
                        searchResults.error :
                        this.state.query.length?
                            searchResults.map( (book) => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    shelf={this.getShelf(book)}
                                    updateShelf={updateShelf}
                                />
                            )):
                            this.props.loading?
                            '':
                            <h3>Waiting for your search ;)</h3>
                    }
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
