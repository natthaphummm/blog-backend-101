# Web Blog Backend

## Overview

This project is a RESTful API server built with Node.js, Express, TypeScript, and Prisma ORM. It provides a backend for managing blog posts, courses, lessons, and user authentication, supporting both blogging and e-learning features.

> This project is created to practice backend development.

## Features

-   **User Authentication**: Register, login, logout, JWT-based authentication, and role-based authorization (USER, ADMIN).
-   **Blog Posts**: CRUD operations for posts, including published/unpublished filtering and slug-based retrieval.
-   **Courses & Lessons**: CRUD operations for courses and lessons, with support for course-lesson relationships.
-   **API Documentation**: Swagger UI available at `/api-docs`.
-   **Security**: Helmet, CORS, rate limiting, and secure password hashing.
-   **Validation**: Request validation using Zod schemas.
-   **Database**: PostgreSQL via Prisma ORM.

## Tech Stack

-   **Node.js** & **Express**
-   **TypeScript**
-   **Prisma ORM** (PostgreSQL)
-   **Zod** (validation)
-   **JWT** (authentication)
-   **Swagger UI** (API docs)

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=
DATABASE_URL=
PORT=
CORS_ORIGIN=
JWT_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=
```

### Database Migration

```bash
npx prisma migrate deploy
```

### Running the Server

```bash
npm run dev
```

The server will start on the port specified in your `.env` (default: 3000).

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

### Auth

-   `POST /api/auth/register` — Register a new user
-   `POST /api/auth/login` — Login and receive JWT
-   `POST /api/auth/logout` — Logout
-   `POST /api/auth/refresh-token` — Refresh JWT
-   `GET /api/auth/me` — Get current user info (auth required)

### Posts

-   `GET /api/posts` — List posts (filter by published)
-   `GET /api/posts/:id` — Get post by ID
-   `GET /api/posts/slug/:slug` — Get post by slug
-   `POST /api/posts` — Create post (admin only)
-   `PUT /api/posts/:id` — Update post (admin only)
-   `DELETE /api/posts/:id` — Delete post (admin only)

### Courses

-   `GET /api/courses` — List courses (filter by published)
-   `GET /api/courses/:id` — Get course by ID
-   `GET /api/courses/slug/:slug` — Get course by slug
-   `POST /api/courses` — Create course (admin only)
-   `PUT /api/courses/:id` — Update course (admin only)
-   `DELETE /api/courses/:id` — Delete course (admin only)

### Lessons

-   `GET /api/lessons` — List lessons
-   `GET /api/lessons/:id` — Get lesson by ID
-   `GET /api/lessons/course/:id` — Get lessons by course ID
-   `POST /api/lessons` — Create lesson (admin only)
-   `PUT /api/lessons/:id` — Update lesson (admin only)
-   `DELETE /api/lessons/:id` — Delete lesson (admin only)

## Database Schema

The project uses Prisma ORM. See `prisma/schema.prisma` for full details. Main models:

-   **User**: id, email, password, role, posts, courses
-   **Post**: id, title, slug, excerpt, image, content, published, authorId
-   **Course**: id, title, slug, excerpt, image, description, published, authorId, lessons
-   **Lesson**: id, courseId, title, content, order
-   **Token**: id, refreshToken, userId, revoked

## API Documentation

Interactive API docs are available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
