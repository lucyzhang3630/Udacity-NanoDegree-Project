import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import SearchBar from './SearchBar'

class BooksApp extends React.Component {
  state = {
    books:[],
    currentlyReading:[],
    wantToRead:[],
    read:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books});
      this.setState((state)=>({
        currentlyReading:state.books.filter((book)=>book.shelf==="currentlyReading"),
        wantToRead:state.books.filter((book)=>book.shelf==="wantToRead"),
        read:state.books.filter((book)=>book.shelf==="read"),
      }))
    });
  }

  changeShelf(book,event) {

    var shelf = event.target.value;
    if(shelf!=="none"){

      BooksAPI.update(book,shelf).then(()=>{
        var books = this.state;
        var preShelf = book.shelf;

        if(preShelf) {
          var index = books[preShelf].indexOf(book);
          books[preShelf].splice(index,1);

        }

        book.shelf = shelf;
        books[shelf].push(book);

        this.setState({books});
      });


    }
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBar updateBooks={this.changeShelf.bind(this)}/>
        )}/>
        <Route path="/" exact render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Books books={this.state.currentlyReading} updateBooks={this.changeShelf.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Books books={this.state.wantToRead} updateBooks={this.changeShelf.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Books books={this.state.read} updateBooks={this.changeShelf.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
