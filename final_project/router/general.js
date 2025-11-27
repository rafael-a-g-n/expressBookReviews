const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({
    message: "Unable to register user. Username and password are required.",
  });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const response = await Promise.resolve({ data: books });
    return res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
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
