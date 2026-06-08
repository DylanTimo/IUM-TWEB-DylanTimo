# User Data Microservice (Express + MongoDB)

This microservice provides user-related data for the Anime Information Platform.  
It exposes REST endpoints to retrieve:

- User ratings
- User profile information
- User favorite anime

The service communicates with a MongoDB database and is consumed by the Main Server (Gateway).

---

## 🚀 Features

- Fetch all ratings submitted by a specific user
- Fetch the full profile of a user
- Fetch the list of favorite anime of a user
- Lightweight and fast Express server
- CORS enabled (manual implementation, no external packages)
- Fully documented with Swagger (OpenAPI 3)

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Swagger UI (OpenAPI 3)
- YAML-based API documentation

---

## ▶️ Running the Server
Install dependencies: `npm install`

Default port: `http://localhost:3001`
`
---

## 📘 Swagger Documentation
* [OpenAPI](http://localhost:3001/api-docs)