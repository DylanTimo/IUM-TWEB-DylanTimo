### PostgreSQL
Check:
- Cleaned data in: "solution/data/cleaned"
- name: anime_db
- password: 2020
- Port: 5432
- Install packages like sqlalchemy

DB_URL = "postgresql://postgres:2020@localhost:5432/anime_db"

### MongoDb
Just import to anime_db:
- users_favs.csv
- users_profiles.csv
- users_ratings.csv

const mongoURI = 'mongodb://localhost:27017/anime_db';