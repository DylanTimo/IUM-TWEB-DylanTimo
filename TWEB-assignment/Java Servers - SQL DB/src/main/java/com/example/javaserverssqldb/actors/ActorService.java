package com.example.javaserverssqldb.actors;
import  com.example.javaserverssqldb.actor_works.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ActorService {

    private final ActorRepository actorRepository;
    private final WorksService worksService;

    @Autowired
    public ActorService(ActorRepository actorRepository,
                        WorksService worksService){
        this.actorRepository = actorRepository;
        this.worksService = worksService;
    }

    public Actor getById(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getById");

        return this.actorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found - getById"));
    }

    /**
     * Get actors by anime id, calling worksService and mapping the actors
     * @param id anime id
     * @return List of actors
     */
    public List<Actor> getActorsByAnimeId(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getByAnimeId");

        List<Works> works = worksService.getByAnimeId(id);
        return works.stream()
                .map(Works::getActor)
                .distinct()
                .toList();
    }
}
