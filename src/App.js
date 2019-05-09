import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

    state = {
        books: false
    }

    componentDidMount = () => {
        BooksAPI.getAll()
        .then( (books) => {
            this.setState({
                books
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" component={Search} />
                <Route exact path="/" render={() => (
                    <ListBooks books={this.state.books} />
                )} />
            </div>
        )
    }
}

export default BooksApp
