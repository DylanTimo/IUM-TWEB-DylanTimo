package com.example.javaserverssqldb.anime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;

    @Autowired
    public AnimeService(AnimeRepository animeRepository){
        this.animeRepository = animeRepository;
    }

    /**
     * Return an anime by its id
     * @param id anime to find
     * @return anime data
     */
    public Anime getById(Integer id){ // forse ByMal_id
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getById");

        return this.animeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anime not found - getById"));
    }

    /**
     * Get List of anime with that title
     * @param title of the anime to look for
     * @return List of anime, if any
     */
    public List<Anime> getByTitle(String title){
        if(title == null || title.isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "title non valido - getByTitle");

        return this.animeRepository.findByTitle(title);
    }

    /**
     *
     * @return all anime
     */
    public List<Anime> findAll(){ return this.animeRepository.findAll(); }
}
