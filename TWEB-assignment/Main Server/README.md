# Express - Main Server

## Front-end

Using Handlebars to generate dynamic HTML.
Composed of multiple partials such as:
* Navbar
* Catalog
* Login
* ...

## Back-end
### 📌 Overview
The Main Server is an API Gateway built with Node.js + Express.
It acts as the single entry point for the frontend and routes requests to the appropriate backend microservices.

This service does not contain business logic and does not access databases directly.
Its responsibilities are:
- Forwarding requests to microservices
- Normalizing and aggregating responses
- Handling errors consistently
- Exposing a unified REST API to the frontend

---

### 🚀 Technologies
- Node.js
- Express.js
- Axios (HTTP client for microservice communication)
- Handlebars (optional view rendering)
- CORS enabled for frontend access

---

### 🧩 Architecture
It communicates with the following microservices:

| Service       | 	Port | 	Technology        | 	Purpose                                  |
|---------------|-------|--------------------|-------------------------------------------|
| Anime Service | 	8082 | 	Java Spring Boot  | 	SQL queries: anime, stats, top, recent   |
| User Service  | 	3001 | 	Express + MongoDB | 	User profiles, ratings                   |
| Actor Service | 	8082 | 	Java Spring Boot  | 	Voice actors, cast                       |

---

### ▶️ Running the Server
[Default port](http://localhost:3000): `http://localhost:3000`

### Swagger Documentation
* [OpenAPI](http://localhost:3000/api-docs)