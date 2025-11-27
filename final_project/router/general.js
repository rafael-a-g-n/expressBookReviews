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
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await Promise.resolve({ data: books[isbn] });
    if (response.data) {
      return res.status(200).json(response.data);
    } else {
      return res.status(404).json({ message: "Book Doesn't Exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching book details", error: error.message });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  try {
    const requestedAuthor = req.params.author;
    const response = await Promise.resolve({ data: books });
    let foundBooks = [];
    for (const isbn in response.data) {
      if (response.data[isbn].author === requestedAuthor) {
        foundBooks.push(response.data[isbn]);
      }
    }

    if (foundBooks.length > 0) {
      return res.status(200).json(foundBooks);
    } else {
      return res
        .status(404)
        .json({ message: "No books found by that author." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching books by author",
        error: error.message,
      });
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
