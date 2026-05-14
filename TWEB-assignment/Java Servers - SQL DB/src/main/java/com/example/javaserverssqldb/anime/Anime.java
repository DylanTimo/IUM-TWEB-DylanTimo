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
    private Integer score;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "mebers")
    private Integer members;

    @Column(name = "favorites")
    private Integer favorites;

    @Column(name = "genres", columnDefinition = "TEXT")
    private String[] genres;

    @Column(name = "themes", columnDefinition = "TEXT")
    private String[] themes;

    @Column(name = "sources", columnDefinition = "TEXT")
    private String source;

    @Column(name = "episodes")
    private Integer episodes;

    @Column(name = "producers", columnDefinition = "TEXT")
    private String[] producers;

    @Column(name = "total_users")
    private Integer total_users;



    public Anime(){

    }

    public Anime(Integer id, String title){
        this.id = id;
        this.title = title;
    }
}
