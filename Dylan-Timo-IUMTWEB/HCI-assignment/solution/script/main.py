import os
import pandas as pd
from sqlalchemy import create_engine, text

# === Percorsi robusti ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FOLDER = os.path.join(BASE_DIR, "..", "data", "cleaned")

# === Connessione al DB ===
DB_URL = "postgresql://postgres:2020@localhost:5432/anime_db"
engine = create_engine(DB_URL)

# === Schema SQL delle tabelle ===
schema = {
    "anime": {
        "mal_id": "INTEGER PRIMARY KEY",
        "title": "TEXT",
        "image_url": "TEXT",
        "type": "TEXT",
        "status": "TEXT",
        "score": "REAL",
        "scored_by": "REAL",
        "rank": "REAL",
        "popularity": "INTEGER",
        "members": "INTEGER",
        "favorites": "INTEGER",
        "genres": "TEXT",
        "themes": "TEXT",
        "source": "TEXT",
        "rating": "TEXT",
        "episodes": "INTEGER",
        "year": "INTEGER",
        "producers": "TEXT"
    },

    "anime_characters": {
        "character_mal_id": "INTEGER",
        "role": "TEXT",
        "favorites": "INTEGER",
        "anime_mal_id": "TEXT",
        "nickname": "TEXT",
        "character_name": "TEXT"
    },

    "anime_recommendation": {
        "mal_id": "INTEGER PRIMARY KEY",
        "recommended_anime_id": "TEXT"
    },

    "anime_stats": {
        "mal_id": "INTEGER PRIMARY KEY",
        "watching": "INTEGER",
        "completed": "INTEGER",
        "on_hold": "INTEGER",
        "dropped": "INTEGER",
        "plan_to_watch": "INTEGER",
        "total": "INTEGER",
        "score_1_votes": "REAL",
        "score_2_votes": "REAL",
        "score_3_votes": "REAL",
        "score_4_votes": "REAL",
        "score_5_votes": "REAL",
        "score_6_votes": "REAL",
        "score_7_votes": "REAL",
        "score_8_votes": "REAL",
        "score_9_votes": "REAL",
        "score_10_votes": "REAL"
    },

    "actors_details": {
        "person_mal_id": "INTEGER PRIMARY KEY",
        "relevant_location": "TEXT",
        "image_url": "TEXT",
        "name": "TEXT",
        "favorites": "INTEGER",
        "alt_name": "TEXT"
    },

    "actors_voice_works": {
        "id": "SERIAL PRIMARY KEY",
        "person_mal_id": "INTEGER",
        "role": "TEXT",
        "anime_mal_id": "INTEGER",
        "character_mal_id": "INTEGER",
        "language": "TEXT",
        "image_url": "TEXT"
    }
}

# === Primary key composte ===
composite_keys = {
    "anime_characters": ["character_mal_id", "role"]
}

# === Creazione tabella ===
def create_table(table_name, columns, composite_pk=None):
    cols_sql = ", ".join([f"{col} {dtype}" for col, dtype in columns.items()])

    if composite_pk:
        pk_sql = f", PRIMARY KEY ({', '.join(composite_pk)})"
    else:
        pk_sql = ""

    sql = f"""
    DROP TABLE IF EXISTS {table_name} CASCADE;
    CREATE TABLE {table_name} (
        {cols_sql}
        {pk_sql}
    );
    """

    with engine.connect() as conn:
        conn.execute(text(sql))
        conn.commit()

# === Import CSV ===
def import_csv(table_name, file_path):
    df = pd.read_csv(file_path)
    df.to_sql(table_name, engine, if_exists="append", index=False)

# === Main ===
def main():
    for file in os.listdir(CSV_FOLDER):
        if not file.endswith(".csv"):
            continue

        table_name = file.replace(".csv", "").lower()

        if table_name not in schema:
            print(f"⚠ Nessuno schema definito per {table_name}, salto.")
            continue

        print(f"\n=== Creazione tabella {table_name} ===")
        pk = composite_keys.get(table_name)
        create_table(table_name, schema[table_name], composite_pk=pk)

        print(f"=== Import {file} → {table_name} ===")
        import_csv(table_name, os.path.join(CSV_FOLDER, file))

    print("\n🎉 Import completato!")

if __name__ == "__main__":
    main()
