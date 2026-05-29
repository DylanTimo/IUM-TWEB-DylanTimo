package com.example.javaserverssqldb.anime_stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StatsService {

    private final StatsRepository statsRepository;

    @Autowired
    public StatsService(StatsRepository statsRepository){
        this.statsRepository = statsRepository;
    }

    /**
     * Get anime stats by its id
     * @param id anime id
     * @return anime stats
     */
    public Stats getById(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getById");

        return this.statsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stats not found - getById"));
    }

}
