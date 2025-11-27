# Express Book Reviews API 📚

This project provides a comprehensive RESTful API for managing book reviews, built with Node.js and Express. It features user authentication, JWT-based authorization, and various endpoints for accessing and managing book data.

## ✨ Features

- **User Authentication**: Secure user registration and login.
- **JWT Authorization**: Protects routes using JSON Web Tokens.
- **Session Management**: Utilizes `express-session` for maintaining user sessions.
- **Book Management**: CRUD operations for books (Create, Read, Update, Delete).
- **Review System**: Users can add, modify, and delete their book reviews.
- **Public Access**: Browse all books and search by ISBN, author, or title without authentication.

## 🛠️ Technologies & Methodologies

### Backend

- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **JSON Web Tokens (JWT)**: For secure, stateless authentication.
- **Express Session**: Middleware for managing user sessions.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### Development Methodologies

- **RESTful API Design**: Adherence to REST principles for clear and consistent API endpoints.
- **Modular Routing**: Routes are organized into separate files (`auth_users.js`, `general.js`) for better maintainability and scalability.
- **Authentication & Authorization**: Implementation of both session-based and JWT-based security mechanisms.

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rafael-a-g-n/expressBookReviews.git
    cd expressBookReviews/final_project
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```
    The API will be running on `http://localhost:3000`.

## 🤝 Contributing

This project was developed as part of an IBM Full-Stack Software Developer course.
It is based on a foundational repository.

Original project source: [IBM Cloud Application Development](https://www.coursera.org/learn/cloud-application-development-nodejs-ibm) (Please adjust if a specific public repo for the original exists.)

Big thanks to the original creators and contributors of the foundational material! 🙏

This project is maintained by [rafael-a-g-n](https://github.com/rafael-a-g-n).
