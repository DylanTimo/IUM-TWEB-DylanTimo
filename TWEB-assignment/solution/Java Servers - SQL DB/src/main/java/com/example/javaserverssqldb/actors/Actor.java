package com.example.javaserverssqldb.actors;
import com.example.javaserverssqldb.actor_works.*;

import jakarta.persistence.*;


import java.util.List;

@Entity
@Table(name = "actors_details")
public class Actor {

    @Id
    @Column(name = "person_mal_id", nullable = false, columnDefinition = "integer")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "relevant_location")
    private String relevant_location;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "favorites")
    private Integer favorites;

    @Column(name = "alt_names")
    private String alt_names;

    @OneToMany(mappedBy = "actor")
    private List<Works> works;

    public Actor(){}

    public Actor(Integer id, String name){
        this.id = id;
        this.name = name;

    }

    /**
     * Getter and Setters methods
     */
    public Integer getId(){ return this.id; }
    public void setId(Integer id){ this.id = id; }

    public String getName(){ return this.name; }
    public void setName(String name){ this.name = name; }

    public String getRelevant_location(){ return this.relevant_location; }
    public void setRelevant_location(String relevant_location){ this.relevant_location = relevant_location; }

    public String getImage_url(){ return this.image_url; }
    public void setImage_url(String image_url){ this.image_url = image_url; }

    public Integer getFavorites(){ return this.favorites; }
    public void setFavorites(Integer favorites){ this.favorites = favorites; }

    public String getAlt_names(){ return this.alt_names; }
    public void setAlt_names(String alt_names){ this.alt_names = alt_names; }

}
