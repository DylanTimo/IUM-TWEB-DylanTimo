package com.example.javaserverssqldb.anime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.data.domain.Pageable;


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
    public Anime getById(Integer id){
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

        return this.animeRepository.findByTitleContainingIgnoreCase(title);
    }

    /**
     * Get all anime
     * @return all anime
     */
    public List<Anime> getAll(){ return this.animeRepository.findAll(); }

    public List<Anime> getTopByYear(Pageable pageable, Integer year){
        if(pageable.getPageSize() < 1 || year == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopByYear");

        return this.animeRepository.findTopByYear(pageable, year);
    }

    /**
     * Get top anime by year
     * @param pageable pageable object with search parameters
     * @return List of anime, sorted by score
     */
    public List<Anime> getTopGlobal(Pageable pageable){
        if(pageable.getPageSize() < 1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopGlobal");

        return this.animeRepository.findTopGlobal(pageable);
    }

    /**
     * Get recent anime, calculated by year
     * @param pageable pageable object with search parameters
     * @return List of anime, sorted by year
     */
    public List<Anime> getRecent(Pageable pageable){
        if(pageable.getPageSize() < 1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopGlobal");

        return this.animeRepository.findRecent(pageable);
    }


}
