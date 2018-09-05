import React from 'react';

class Books extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book)=>{
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
                    <select onChange={(e)=>this.props.updateBooks(book,e)}>
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
    )
  }
}

export default Books;
