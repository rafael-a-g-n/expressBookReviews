const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book Doesn't Exist" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const requestedAuthor = req.params.author;
  let foundBooks = [];

  for (const isbn in books) {
    if (books[isbn].author === requestedAuthor) {
      foundBooks.push(books[isbn]);
    }
  }

  if (foundBooks.length > 0) {
    return res.status(200).json(foundBooks);
  } else {
    return res.status(404).json({ message: "No books found by that author." });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const requestedTitle = req.params.title.toLowerCase();
  let foundBooks = [];
  for (const isbn in books) {
    if (books[isbn].title.toLowerCase() === requestedTitle) {
      foundBooks.push(books[isbn]);
    }
  }

  if (foundBooks.length > 0) {
    return res.status(200).json(foundBooks);
  } else {
    return res.status(404).json({ message: "No books found with that title." });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book Doesn't Exist" });
  }
});

module.exports.general = public_users;
