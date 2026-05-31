package com.example.javaserverssqldb.actor_works;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class WorksService {

    private final WorksRepository worksRepository;

    @Autowired
    public WorksService(WorksRepository worksRepository){
        this.worksRepository = worksRepository;
    }

    /**
     * Get works by actor id
     * @param id actor id
     * @return List of works
     */
    public List<Works> getByActorId(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getByActorId");

        return this.worksRepository.findByActorId(id);
    }

    /**
     * Get actors by anime id
     * @param id anime id
     * @return List of works
     */
    public List<Works> getByAnimeId(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getByAnimeId");

        return this.worksRepository.findByAnimeId(id);
    }
}
