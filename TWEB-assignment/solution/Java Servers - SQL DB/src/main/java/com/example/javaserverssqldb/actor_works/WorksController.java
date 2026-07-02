package com.example.javaserverssqldb.actor_works;

import com.example.javaserverssqldb.actors.Actor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Tag(name = "Actor Works API", description = "Operations on AnimeDB")
@RestController
@RequestMapping("/works")
public class WorksController {

    private final WorksService worksService;

    public WorksController(WorksService worksService){
        this.worksService = worksService;
    }



    @Operation(
            summary = "Get a work by the anime ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID missing - getByAnimeId - getById")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byAnime")
    public Works getWorksByAnimeId(@RequestParam Integer animeId){ return worksService.getById(animeId); }



    @Operation(
            summary = "Get a work by the anime ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID missing - getByAnimeId - getById")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byActor")
    public List<Works> getWorksByActorId(@RequestParam Integer actorId){ return worksService.getByActorId(actorId); }



    @Operation(
            summary = "Get a work by the character ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Character ID missing - getByCharacterId")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byCharacter")
    public List<Works> getWorksByCharacterId(@RequestParam Integer characterId){ return worksService.getByCharacterId(characterId); }



    @Operation(
            summary = "Get a work by its id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID not valid - getById"),
            @ApiResponse(responseCode = "404", description = "Work not found - getById\"")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Works getWorkById(@PathVariable long id){ return worksService.getById(id); }
}
