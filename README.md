# Scratch - E-Commerce Shopping Application

## Overview

Scratch is a full-stack e-commerce web application built using Node.js, Express.js, MongoDB, and EJS. The application provides separate functionalities for users and administrators, allowing users to browse products, manage their carts, and place orders while administrators can manage products through a dedicated dashboard.

---

## Features

### User Features

* User Registration and Login
* Secure Authentication using JWT
* Browse Products
* Add Products to Cart
* Flash Messages for User Feedback
* Protected Routes

### Admin Features

* Admin Dashboard
* Product Creation and Management
* Image Upload using Multer
* Product Listing Management

---

## Tech Stack

### Frontend

* EJS
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

### File Uploads

* Multer

---

## Project Structure

* User Authentication
* Admin Authentication
* Product Management
* Shopping Cart System
* Flash Messaging System
* Image Upload Functionality

---

## Installation

### Clone the repository

```bash
git clone https://github.com/PariInCode/Scratch.git
```

### Navigate to the project directory

```bash
cd Scratch
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

Add the following environment variables:

```env
JWT_KEY=your_jwt_key
JWT_SECRET=your_secret_key
JWT_SUCCESS_KEY=your_success_key
MONGODB_URI=your_mongodb_connection_string
```

### Run the application

```bash
npx nodemon app.js
```

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* EJS
* Tailwind CSS
* JWT
* Multer
* Connect Flash

---

## Future Improvements

* Payment Gateway Integration
* Order Management System
* Product Search and Filters
* Wishlist Feature
* User Profile Management
* Responsive Mobile Design

---

## Author

**Pari**

GitHub: https://github.com/PariInCode

---

## License

This project is created for learning and educational purposes.
