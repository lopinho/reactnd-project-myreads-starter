import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

    state = {
        shelfs: {},
        books: {},
        loading: true,
        searchResults: []
    }

    componentDidMount = () => {
        BooksAPI.getAll()
        .then((books) => {
            const myBooks = {}
            const shelfs = {}

            books.forEach((book) => {
                myBooks[book.id] = book;

                if (book.shelf in shelfs) {
                    shelfs[book.shelf].push(book.id)
                } else {
                    shelfs[book.shelf] = [book.id]
                }
            })

            this.setState({
                books: myBooks,
                shelfs: shelfs,
                loading: false
            })
        })
    }

    searchBook = (query) => {
        this.setState({
            loading: true,
            searchResults: []
        })
        BooksAPI.search(query)
        .then((searchResults) => {
            this.setState({
                searchResults,
                loading: false
            })
        })
    }
    updateShelf = (book, shelf) => {
        this.setState({loading: true})
        BooksAPI.update(book, shelf)
        .then( (updatedShelfs) => {
            this.setState((prevState) => {
                const books = prevState.books
                books[book.id].shelf = shelf
                return {
                    shelfs: updatedShelfs,
                    books: books,
                    loading: false
                }
            })
        })

    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={({history}) => (
                    <Search
                        loading={this.state.loading}
                        searchResults={this.state.searchResults}
                        searchBook={(query) => this.searchBook(query)}
                        books={this.state.books}
                        updateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf)
                            history.push('/')
                        }}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooks
                        loading={this.state.loading}
                        books={this.state.books}
                        shelfs={this.state.shelfs}
                        clearSearch={() => this.setState({searchResults: []}) }
                        updateShelf={(book, shelf) => (this.updateShelf(book, shelf))}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
