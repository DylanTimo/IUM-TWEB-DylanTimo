package com.example.javaserverssqldb.anime;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Anime API", description = "Operations on AnimeDB")
@RestController
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService){
        this.animeService = animeService;
    }

    @Operation(
            summary = "Get an anime by its id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "ID missing - getById"),
            @ApiResponse(responseCode = "404", description = "Anime not found - getById")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Anime getAnimeById(@PathVariable Integer id){
        return animeService.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<Anime> getAll(){ return animeService.findAll(); }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/top")
    public List<Anime> getTopByYear(@RequestParam Integer year,
                                    @RequestParam Integer max){
        return animeService.getTopByYear(year, max);
    }
}
