# 📘 Anime Data Microservice (Spring Boot + PostgreSQL)

This microservice provides static anime-related data for the Anime Information Platform.
It exposes REST endpoints to retrieve:

- Anime details
- Anime statistics
- Actors and voice‑cast information

Relational data stored in PostgreSQL (anime, stats, actors, works)

The service communicates with a PostgreSQL database and is consumed by the Main Server (Gateway).

---

# 🚀 Features
- Fetch full anime information by ID
- Fetch anime statistics (watching, completed, dropped, etc.)
- Fetch actors who worked on a specific anime
- Fully relational data model using JPA/Hibernate
- Clean-layered architecture (Controller → Service → Repository)
- Swagger documentation (OpenAPI 3)
- Fast and scalable Spring Boot server

---

📦 Technologies Used
Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Swagger UI

### Swagger Documentation
* [OpenAPI](http://localhost:8082/swagger-ui/index.html)