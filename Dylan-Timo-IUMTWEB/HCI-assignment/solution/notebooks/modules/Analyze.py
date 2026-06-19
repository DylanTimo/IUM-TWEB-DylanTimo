import pandas as pd
import plotly.express as px
from plotly.subplots import make_subplots


# --------------------------------------------
#-------USED IN AnalysisAnime ----------------
# --------------------------------------------

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

def scatter2_rank_score(dfAnime):
    fig = px.scatter(dfAnime,
                     x="rank",
                     y="score",
                     hover_name="title",
                     title="Score/Rank Distribution curve",
                     labels={
                         "rank": "Anime Rank",
                         "score": "Anime Score"
                     })
    fig.update_xaxes(range=[0, 15000])
    fig.update_layout(title_x=0.5)

    return fig


def scatter3_title_num(dfTemp):
    fig = px.scatter(dfTemp.head(150),
                     x="title",
                     y="num",
                     size="popularity",
                     hover_name="title",
                     title="Recommendation Curve",
                     labels={
                         "num": "Recommendation count",
                         "title": "Anime Title"
                     })
    fig.update_xaxes(
        tickfont=dict(size=7),
        tickangle=45
    )
    fig.update_layout(title_x=0.5)

    return fig

def scatter4_num_score(dfTemp):
    fig = px.scatter(dfTemp,
                     x="num",
                     y="score",
                     hover_name="title",
                     size="popularity",
                     color="rank",
                     labels={
                         "num": "Recommendation count",
                         "score": "Anime Score",
                         "rank": "Rank"
                     }
                     )
    fig.update_xaxes(
        tickfont=dict(size=7),
        tickangle=45
    )
    fig.update_coloraxes(reversescale=True)

    return fig

def scatter5_score_num(dfTemp):
    fig = px.scatter(dfTemp,
                     x="score",
                     y="num",
                     hover_name="title",
                     color="type",
                     title="Recommendations/Score Scatter",
                     labels={
                         "num": "Recommendation count",
                         "score": "Anime Score"
                     })
    fig.update_xaxes(
        tickfont=dict(size=7),
        tickangle=45
    )
    fig.update_xaxes(range=[3, 10])
    fig.update_yaxes(range=[-50, 300])
    #fig.write_image("data/images/rpova.png")

    return fig


def bar1_num_title(dfTemp):
    import numpy as np

    dfTemp["popularity_log"] = np.log1p(dfTemp["popularity"])

    fig = px.bar(
        dfTemp.head(20),
        x="num",
        y="title",
        hover_name="title",
        color="popularity_log",
        orientation="h",
        log_x=True,
        text="num",
        title="Top 20 Recommended Anime",
        color_continuous_scale=[
            [0, "#cc0000"],  # rosso molto chiaro
            [1, "#ffcccc"]  # rosso acceso
        ],
        labels={
            "num": "Recommendation count",
            "title": "Anime Title",
            "popularity_log": "Popularity"
        }
    )

    fig.update_yaxes(autorange="reversed")
    fig.update_traces(textposition="outside")
    fig.update_layout(title_x=0.5)
    fig.update_coloraxes(reversescale=True)

    return fig

def subplot1_heatmap_lines(dfAnime):


    # Heatmap originale
    heatmap = px.density_heatmap(
        dfAnime,
        x="year",
        y="score",
        nbinsx=50,
        nbinsy=50,
        hover_name="title",
        labels={
            "year": "Released year",
            "score": "Anime Score"
        }
    )

    # Line chart
    df_counts = dfAnime.groupby(["year", "type"]).size().reset_index(name="count")
    df_counts_sub = df_counts[df_counts["year"] % 2 == 0]
    line_fig = px.line(df_counts_sub, x="year", y="count", color="type", markers=True)
    line_fig.update_traces(marker=dict(size=4))

    # Subplot
    fig = make_subplots(
        rows=2, cols=1,
        shared_xaxes=True,
        vertical_spacing=0.12,
        row_heights=[0.45, 0.55]
    )

    # Aggiungi heatmap
    for trace in heatmap.data:
        trace.update(coloraxis="coloraxis1")
        fig.add_trace(trace, row=1, col=1)

    # Aggiungi line chart
    for trace in line_fig.data:
        fig.add_trace(trace, row=2, col=1)

    # Reimposta i bin
    fig.update_traces(
        nbinsx=60,
        nbinsy=50,
        selector=dict(type="histogram2d")
    )

    fig.update_layout(title="Anime Heatmap + Yearly Production by Type",
                      title_x=0.5,
                      height=1000
                      )
    fig.update_xaxes(range=[1970, 2026], row=1, col=1)
    fig.update_xaxes(range=[1970, 2026], row=2, col=1)
    fig.update_yaxes(range=[-50, 400], row=2, col=1)
    fig.update_layout(
        coloraxis1=dict(
            colorbar=dict(
                x=1.02,
                y=0.80,  # move UP
                len=0.5,  # shorten the bar
                thickness=15
            )
        )
    )
    fig.update_layout(
        legend=dict(
            x=1.02,  # move right
            y=0.40,  # move UP
            xanchor="left",
            yanchor="top"
        )
    )

    df_counts_sub = None
    df_counts = None

    return fig


# --------------------------------------------
#-------USED IN AnalysisUser ----------------
# --------------------------------------------
mapping = {
    'Congo (Kinshasa)': 'Democratic Republic of the Congo',
    'Congo (Brazzaville)': 'Republic of the Congo',
    'US': 'United States of America',
    'USA': 'United States of America',
    'United States': 'United States of America',
    'Tanzania': 'United Republic of Tanzania'
}

def subplot2_pie_bar(dfUsersRatings, dfScores):
    # Pie
    pieChart = px.pie(dfUsersRatings, names="status", title="Anime Status")

    #Bar
    barChart = px.bar(dfScores, x="score", y="num_ratings")
    barChart.update_traces(x=dfScores["score"], y=dfScores["num_ratings"])

    fig = make_subplots(
        rows=1, cols=2,
        specs=[[{"type": "xy"}, {"type": "domain"}]]
    )

    # Add pie chart
    for trace in pieChart.data:
        fig.add_trace(trace, row=1, col=2)

    # Add bar chart
    for trace in barChart.data:
        fig.add_trace(trace, row=1, col=1)

    fig.update_layout(title="Status Pie Chart + Score Bar Chart", title_x=0.5)
    fig.update_xaxes(range=[1, 10], row=1, col=1)
    fig.update_yaxes(range=[0, 80000], row=1, col=1)

    return fig

def subplot3_line_line(dfAnime, dfScores):
    scoreAgg = (
        dfAnime.groupby("score")
        .size()
        .reset_index(name="score_count")
    )
    lineChartUser = px.line(scoreAgg, x="score", y="score_count")

    lineChartAnime = px.line(dfScores, x="score", y="num_ratings")

    fig = make_subplots(
        rows=1, cols=2
    )

    for trace in lineChartUser.data:
        fig.add_trace(trace, row=1, col=2)

    for trace in lineChartAnime.data:
        fig.add_trace(trace, row=1, col=1)

    fig.update_layout(title="Anime Score by User reviews + Anime Score By Analytics", title_x=0.5)
    fig.update_xaxes(range=[1, 10], row=1, col=1)
    fig.update_yaxes(range=[1, 80000], row=1, col=1)

    return fig

def bar_episodes_score(dfUsersRatings):
    dfAgg = dfUsersRatings.groupby("score")["num_watched_episodes"].mean().reset_index()

    fig = px.bar(
        dfAgg,
        x="num_watched_episodes",
        y="score",
        orientation="h",
        labels={
            "score": "Anime Score",
            "num_watched_episodes": "Mean of n° episodes watched"
        }
    )
    fig.update_yaxes(range=[1, 10])
    dfAgg = None

    return fig

def scatter6_favs_score(dfAnimeFav):
    fig = px.scatter(
        dfAnimeFav,
        x="num_favs",
        y="score",
        hover_name="title",
        opacity=0.7,
        labels={
            "num_favs": "Favorite count",
            "score": "Anime Score"
        },
        title="Favourite Anime/Score Distribution"
    )
    fig.update_traces(textposition="top center")
    fig.update_xaxes(range=[1, 1500])

    return fig

import geopandas as gpd
from matplotlib.colors import LogNorm

def gdf_plot1(dfUsersProfiles):
    dfWatched = (
        dfUsersProfiles
        .groupby("location")
        .size()
        .reset_index(name="total")
    )

    gdfCountries = gpd.read_file("../data/country data/ne_10m_admin_0_countries.shp")
    # gdfCountries["ADMIN"] = gdfCountries["ADMIN"].replace(mapping)
    gdfWatched = dfWatched.merge(gdfCountries, left_on="location", right_on="ADMIN")
    gdfWatched = gpd.GeoDataFrame(gdfWatched, geometry="geometry", crs="EPSG:4326")
    # gdfWatched
    dfWatched = None

    ax = gdfCountries.plot(
        figsize=(15, 10),
        color="lightgray",
        edgecolor="black",
        linewidth=0.5
    )
    gdfWatched.plot(
        ax=ax,
        linewidth=1.5,
        edgecolor="black",
        column="total",
        cmap="inferno",
        legend=True,
        norm=LogNorm()
    )

    ax.set_facecolor("lightblue")
    ax.set_title("Most user activity based on location")
    ax.set_xticks([])
    ax.set_yticks([])
    ax.grid(False)

    return ax