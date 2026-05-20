package com.example.javaserverssqldb.anime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "anime")
public class Anime {

    @Id
    @Column(name = "mal_id", nullable = false, columnDefinition = "TEXT")
    private Integer id;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "type", columnDefinition = "TEXT")
    private String type;

    @Column(name = "status", columnDefinition = "TEXT")
    private String status;

    @Column(name = "score")
    private float score;

    @Column(name = "rank")
    private float rank;

    @Column(name = "members")
    private Integer members;

    @Column(name = "favorites")
    private Integer favorites;

    @Column(name = "genres", columnDefinition = "TEXT")
    private String genres;

    @Column(name = "themes", columnDefinition = "TEXT")
    private String themes;

    @Column(name = "source", columnDefinition = "TEXT")
    private String source;

    @Column(name = "episodes")
    private Integer episodes;

    @Column(name = "year")
    private Integer year;

    @Column(name = "producers", columnDefinition = "TEXT")
    private String producers;

    @Column(name = "total_users")
    private Integer total_users;


    /**
     * Empty constructor
     */
    public Anime(){

    }

    /**
     * Simple constructor
     * @param id Anime
     * @param title Anime
     */
    public Anime(Integer id, String title){
        this.id = id;
        this.title = title;
    }

    /**
     * Getter and Setters methods
     */
    public Integer getId(){ return this.id; }
    public void setId(Integer id){ this.id = id; }

    public String getTitle(){ return this.title; }
    public void setTitle(String title){ this.title = title; }

    public String getType(){ return this.type; }
    public void setType(String type){ this.type = type; }

    public String getStatus(){ return this.status; }
    public void setStatus(String status){ this.status = status; }

    public float getRank(){ return  this.rank; }
    public void setRank(float rank){ this.rank = rank; }

    public float getScore(){ return this.score; }
    public void setScore(float score){ this.score = score; }

    public Integer getMembers(){ return this.members; }
    public void setMembers(Integer members){ this.members = members; }

    public Integer getFavorites(){ return this.favorites; }
    public void setFavorites(Integer favorites){ this.favorites = favorites; }

    public String getGenres(){ return this.genres; }
    public void setGenres(String genres){ this.genres = genres; }

    public String getThemes(){ return this.themes; }
    public void setThemes(String themes){ this.themes = themes; }

    public String getSource(){ return this.source; }
    public void setSource(String source){ this.source = source;}

    public Integer getEpisodes(){ return this.episodes; }
    public void setEpisodes(Integer episodes){ this.episodes = episodes; }

    public Integer getYear(){ return this.year; }
    public void setYear(Integer year){ this.year = year; }

    public String getProducers(){ return this.producers; }
    public void setProducers(String producers){ this.producers = producers; }

    public Integer getTotal_users(){ return this.total_users; }
    public void setTotal_users(Integer total_users){ this.total_users = total_users; }

}
