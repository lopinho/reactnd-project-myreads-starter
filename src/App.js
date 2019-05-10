import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

    state = {
        books: false,
        loading: true,
        searchResults: []
    }

    componentDidMount = () => {
        BooksAPI.getAll()
        .then( (books) => {
            this.setState({
                books:books,
                loading: false
            })
        })
    }

    searchBook = (query) => {
        BooksAPI.search(query)
        .then((searchResults) => {
            this.setState({
                searchResults
            })
        })
    }
    updateShelf = (book, shelf) => {
        this.setState({loading: true})
        BooksAPI.update(book, shelf)
        .then( (updatedShelfs) => {
            book.shelf = shelf
            this.setState( (currentState) => ({
                books: [...currentState.books.filter((item) => (item.id !== book.id)), book],
                loading: false
            }))
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
                        updateShelf={(book, shelf) => (this.updateShelf(book, shelf))}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
