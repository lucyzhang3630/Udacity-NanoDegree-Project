import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBar extends React.Component {
  state = {
    books:[]
  }
  search(event) {

    var query = event.target.value;
    if(query.length) {
      var self = this;
      BooksAPI.getAll().then((onShelfBooks)=>{
        BooksAPI.search(query).then((books)=>{
          if(books.error) {
            self.setState({books:[]})
          }else if (books!==undefined) {
            for(var i = 0;i<onShelfBooks.length;i++) {
              for(var j = 0; j<books.length;j++){
                if(books[j].id===onShelfBooks[i].id) {
                  books[j].shelf = onShelfBooks[i].shelf
                }
              }
            }

            self.setState({books});
          }
        });
      });
    }else {
      this.setState({books:[]})
    }

  }
  changeShelf(book,event) {

    var shelf = event.target.value;
    if(shelf!=="none"){
      BooksAPI.update(book,shelf);
      this.props.updateBooks(book,event)

    }
  }
  render() {
    if(this.state.books) {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" onChange={this.search.bind(this)}/>

            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book)=>{
              var authors;
              var smallThumbnail;
              if(book.authors) {
                authors = book.authors.join(' & ')
              }else {
                authors = ''
              }
              if(book.imageLinks) {
                smallThumbnail = book.imageLinks.smallThumbnail
              }else {
                smallThumbnail = ''
              }
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(e)=>this.changeShelf(book,e)} value={book.shelf||'none'}>
                          <option value="move" disabled>Move to...</option>
                          <option value="none">None</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{authors}</div>
                  </div>
                </li>
              )
            })}
          </ol>
          </div>
        </div>
      )
    }

  }
}

export default SearchBar;
