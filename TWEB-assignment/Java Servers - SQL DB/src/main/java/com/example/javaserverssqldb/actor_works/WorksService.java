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
     * Get works by id
     * @param id works id
     * @return works
     */
    public Works getById(long id){
        if(id < 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID not valid - getById");

        return this.worksRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Works not found - getById"));
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

    /**
     * Get works by character id
     * @param id character id
     * @return List of works
     */
    public List<Works> getByCharacterId(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Character ID missing - getByCharacterId");

        return this.worksRepository.findByCharacterId(id);
    }
}
