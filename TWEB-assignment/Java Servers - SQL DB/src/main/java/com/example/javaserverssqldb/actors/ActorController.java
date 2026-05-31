package com.example.javaserverssqldb.actors;

import com.example.javaserverssqldb.actor_works.WorksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Actors API", description = "Operations on AnimeDB - Actors")
@RestController
@RequestMapping("/actors")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService,
                           WorksService worksService){
        this.actorService = actorService;
    }

    @Operation(
            summary = "Get an actor by its id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID missing - getById"),
            @ApiResponse(responseCode = "404", description = "Actor not found - getById\"")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Actor getActorById(@PathVariable Integer id){ return actorService.getById(id); }

    @Operation(
            summary = "Get a list of actors by an anime id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID missing - getById"),
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byAnime")
    public List<Actor> getActorByAnimeId(@RequestParam Integer animeId){ return this.actorService.getActorsByAnimeId(animeId); }
}
