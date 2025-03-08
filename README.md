# Blog API

A RESTful API for a blog platform built with Node.js, Express, and MongoDB.

## Features

- User Authentication
  - Registration
  - Login with JWT
  - Protected routes

- Blog Posts
  - Create, Read, Update, Delete (CRUD) operations
  - Category assignment
  - Tags support
  - Author attribution

- Categories
  - Create and list categories
  - Associate posts with categories

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post (protected)
- `PATCH /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category (protected)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install