
# Task Tracker App

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It implements user authentication functionalities using JSON Web Tokens (JWT) and bcrypt for password hashing.
## Table of Contents

 - [Overview](#overview)
 - [Features](#features)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Technologies Used](#technologies-used)


## Overview

This project provides a foundation for implementing user authentication in a MERN-based application. It includes a user registration system, login/logout functionality, password encryption using bcrypt, and token-based authentication using JWT and all the CRUD operations.
## Features

- User registration: Allows users to create new accounts securely.
- User login/logout: Provides authentication through login/logout functionalities.
- Password encryption: Uses bcrypt to securely hash user passwords.
- Token-based authentication: Implements JWT for user authorization and access control.


## Installation

- Clone this repository.
- Install dependencies for backend: 
   `cd ./backend`, `npm i` and `npm run dev`.
- Install dependencies for frontend: 
   `cd ./frontend`, `npm i` and `npm run dev`.
    
## Usage

- Register a new user account using the provided registration form.
- Log in with your registered credentials.
- Access protected routes or customize the authentication flow as needed for your application.
## Technologies Used

- MongoDB: NoSQL database for storing user data.
- Express.js: Backend framework for handling HTTP requests and routing.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side scripting.
- JWT (JSON Web Tokens): For user authentication and authorization.
- bcrypt: Library for hashing passwords securely.

