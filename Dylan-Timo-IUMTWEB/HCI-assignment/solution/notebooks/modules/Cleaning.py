import pandas as pd

# --------------------------------------------
#-------USED IN CleaningAnime ----------------
# --------------------------------------------

def clean_anime_details(dfDetails):
    dfDetails.drop_duplicates()
    dfDetails = dfDetails.drop(columns=["title_japanese",
                                        "url",
                                        "end_date",
                                        "synopsis",
                                        "studios",
                                        "demographics",
                                        "season",
                                        "licensors",
                                        "explicit_genres",
                                        "streaming"],
                               errors="ignore")


    dfDetails["type"] = dfDetails["type"].fillna("Unknown")
    dfDetails["rating"] = dfDetails["rating"].fillna("Unknown")

    # dfDetails["score"] = dfDetails["score"].fillna(0)
    # dfDetails["scored_by"] = dfDetails["scored_by"].fillna(0)
    # dfDetails["rank"] = dfDetails["rank"].fillna(0)
    # dfDetails["episodes"] = dfDetails["episodes"].fillna(0)
    # dfDetails["year"] = dfDetails["year"].fillna(0)

    dfDetails["episodes"] = dfDetails["episodes"].astype("Int64")

    # getting dates
    dfDetails["start_date"] = pd.to_datetime(dfDetails["start_date"], errors="coerce")
    dfDetails["start_year"] = dfDetails["start_date"].dt.year
    dfDetails["year"] = dfDetails["year"].fillna(dfDetails["start_year"])
    dfDetails["year"] = dfDetails["year"].astype("Int64")

    # dropping duplicates
    dfDetails = dfDetails.drop_duplicates(subset=['mal_id'])
    dfDetails = dfDetails.dropna(subset=['title'])
    dfDetails = dfDetails.drop(columns=["start_year", "start_date"],
                               errors="ignore")
    return dfDetails

def clean_stats(dfStats):
    dfStats = dfStats.drop(columns=dfStats.filter(regex="percentage$").columns)
    dfStats.drop_duplicates()
    dfStats = dfStats.dropna(subset=['mal_id'])

    cols = ["score_1_votes", "score_2_votes", "score_3_votes", "score_4_votes", "score_5_votes", "score_6_votes",
            "score_7_votes", "score_8_votes", "score_9_votes", "score_10_votes"]

    dfStats[cols] = dfStats[cols].fillna(0)
    dfStats[cols] = dfStats[cols].astype(int)
    return dfStats

def clean_recs(dfRecs):
    # no self recommendation
    dfRecs = dfRecs[dfRecs["mal_id"] != dfRecs["recommendation_mal_id"]]
    dfRecs = dfRecs.drop_duplicates(subset=['mal_id', 'recommendation_mal_id'])
    dfRecs = (
        dfRecs.groupby("mal_id")["recommendation_mal_id"]
        .agg(list)
        .reset_index()
    )
    dfRecs = dfRecs.rename(columns={"recommendation_mal_id": "recommended_anime_id"})
    return dfRecs



# --------------------------------------------
#-------USED IN CleaningUsers ----------------
# --------------------------------------------
mapping = {
    'Congo (Kinshasa)': 'Democratic Republic of the Congo',
    'Congo (Brazzaville)': 'Republic of the Congo',
    'US': 'United States of America',
    'USA': 'United States of America',
    'United States': 'United States of America',
    'Tanzania': 'United Republic of Tanzania'
}

def clean_user_profiles(dfProfiles):
    dfProfiles.drop_duplicates()
    dfProfiles = dfProfiles.dropna(subset=['username'])

    dfProfiles["gender"] = dfProfiles["gender"].fillna("Unknown")
    dfProfiles["username"] = dfProfiles["username"].fillna("Unknown")

    dfProfiles["birthday"] = pd.to_datetime(dfProfiles["birthday"], errors="coerce")
    dfProfiles["birthday"] = dfProfiles["birthday"].fillna(pd.NaT)

    dfProfiles["joined"] = pd.to_datetime(dfProfiles["joined"], errors="coerce")
    dfProfiles["joined"] = dfProfiles["joined"].fillna(pd.NaT)

    dfProfiles['location'] = dfProfiles['location'].replace(mapping)

    dfProfiles["watching"] = pd.to_numeric(dfProfiles["watching"], errors="coerce").fillna(0).astype(int)
    dfProfiles["completed"] = pd.to_numeric(dfProfiles["completed"], errors="coerce").fillna(0).astype(int)
    dfProfiles["on_hold"] = pd.to_numeric(dfProfiles["on_hold"], errors="coerce").fillna(0).astype(int)
    dfProfiles["dropped"] = pd.to_numeric(dfProfiles["dropped"], errors="coerce").fillna(0).astype(int)
    dfProfiles["plan_to_watch"] = pd.to_numeric(dfProfiles["plan_to_watch"], errors="coerce").fillna(0).astype(int)

    return dfProfiles

def clean_favorites(dfFavs):
    dfFavs.drop_duplicates()
    dfFavs = dfFavs[dfFavs["username"].notna()]

    return dfFavs

def clean_ratings(dfRatings):
    dfRatings = dfRatings.drop(columns=["is_rewatching"])
    dfRatings["username"] = dfRatings["username"].fillna("Unknown")
    dfRatings = dfRatings[dfRatings["num_watched_episodes"] < 2000]

    return dfRatings

# --------------------------------------------
#-------USED IN CleaningPersons ----------------
# --------------------------------------------
def clean_person_details(dfDetails):
    dfDetails = dfDetails.drop(columns=["url",
                                        "website_url",
                                        "given_name",
                                        "family_name",
                                        "birthday"],
                               errors="ignore")
    dfDetails = dfDetails[dfDetails["name"].notna()]
    return dfDetails

def clean_person_altNames(dfAltNames):
    dfAltNames = dfAltNames[dfAltNames["alt_name"].notna()]
    dfAltNames = dfAltNames.drop_duplicates(subset=['person_mal_id', 'alt_name'])
    dfAltNames = (
        dfAltNames.groupby("person_mal_id")["alt_name"]
        .agg(list)
        .reset_index()
    )
    return dfAltNames



# --------------------------------------------
# -------USED IN CleaningCharacters ----------------
# --------------------------------------------
def clean_characters(dfCharacters):
    dfCharacters = dfCharacters.drop(columns=["url",
                                              "name_kanji",
                                              "about"],
                                     errors="ignore")
    dfCharacters.drop_duplicates(subset=['character_mal_id'])
    dfCharacters["favorites"] = (
        pd.to_numeric(dfCharacters["favorites"], errors="coerce")
        .fillna(0)
        .astype(int)
    )
    dfCharacters = dfCharacters[dfCharacters["character_mal_id"] != 0]
    dfCharacters["character_mal_id"] = (
        pd.to_numeric(dfCharacters["character_mal_id"], errors="coerce")
        .fillna(-1)
        .astype(int)
    )
    dfCharacters = dfCharacters[dfCharacters["character_mal_id"] != -1]

    return dfCharacters

def clean_nicknames(dfNicknames):
    dfNicknames = dfNicknames[dfNicknames["nickname"].notna()]

    dfNicknames = (
        dfNicknames
        .groupby("character_mal_id")["nickname"]
        .apply(list)
        .reset_index()
    )

    return dfNicknames






