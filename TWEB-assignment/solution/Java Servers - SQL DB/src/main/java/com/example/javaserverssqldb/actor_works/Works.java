package com.example.javaserverssqldb.actor_works;
import  com.example.javaserverssqldb.actors.*;

import jakarta.persistence.*;

@Entity
@Table(name = "actors_voice_works")
public class Works {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "person_mal_id")
    private Actor actor;

    @Column(name = "role")
    private String role;

    @Column(name = "anime_mal_id")
    private Integer animeId;

    @Column(name = "character_mal_id")
    private Integer characterId;

    @Column(name = "language")
    private String language;

    public Works(){}

    public Works(Actor actor, String role, Integer animeId, Integer characterId, String language){
        this.actor = actor;
        this.role = role;
        this.animeId = animeId;
        this.characterId = characterId;
        this.language = language;
    }

    /**
     * Getter and Setters methods
     */
    public Long getId(){ return this.id; }

    public Actor getActor(){ return this.actor; }
    public void setActor(Actor actor){ this.actor = actor; }

    public String getRole(){ return this.role; }
    public void setRole(String role){ this.role = role; }

    public Integer getAnimeId(){ return this.animeId; }
    public void setAnimeId(Integer animeId){ this.animeId = animeId; }

    public Integer getCharacterId(){ return this.characterId; }
    public void setCharacterId(Integer characterId){ this.characterId = characterId; }

    public String getLanguage(){ return this.language; }
    public void setLanguage(String language){ this.language = language; }

}
