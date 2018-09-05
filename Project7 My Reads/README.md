# MyReads Project

This is a Reads project build with `ReactJS`. In the home page, it will group the books based on the shelf, you can change the shelf for the books from the select dropdown menu. You can also add new books by clicking on the `+` sign, in the search bar, you can search with terms listed in `SEARCH_TERMS.md`. A list of books matching your search will popup, you can add them to the home page by selecting shelf for the book.

## TL;DR

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with the app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon,
│   └── index.html # index page
└── src
    ├── App.css # Styles for the app. Feel free to customize this as you desire.
    ├── App.js # This is the root of the app. Contains static HTML right now.
    ├── App.test.js # Used for testing.
    ├── Books.js # This is a child component for listing books.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.
    ├── SearchBar.js # This is a child component for search bar and related functionality
```


## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) is a backend server API and contains the methods  needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
