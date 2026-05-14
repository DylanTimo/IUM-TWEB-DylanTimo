package com.example.javaserverssqldb.anime;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService){
        this.animeService = animeService;
    }

    /**
     * Variable id methode
     * @param id
     * @return Anime
     */
    @GetMapping("/{id}")
    public Anime getAnimeById(@PathVariable Integer id){
        return animeService.getById(id);
    }



}
