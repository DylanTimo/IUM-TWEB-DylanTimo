import pandas as pd
import plotly.express as px

def scatter1_total_score(dfAnime):
    fig = px.scatter(dfAnime,
                     x="total",
                     y="score",
                     size="popularity",
                     hover_name="title",
                     color="rank",
                     labels={
                         "total": "Total users",
                         "score": "Anime Score",
                         "popularity": "Popularity Rank"
                     })
    fig.update_xaxes(range=[0, 500000])
    fig.update_coloraxes(reversescale=True)

    return fig