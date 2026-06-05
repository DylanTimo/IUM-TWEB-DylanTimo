package com.example.javaserverssqldb.anime;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

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



    @Operation(
            summary = "Get an anime by its title"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "title missing - getAnimeByTitle")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/title")
    public List<Anime> getAnimeByTitle(@RequestParam String title){ // List<Anime>, maybe there are some anime with the same name
        return animeService.getByTitle(title);
    }



    @Operation(
            summary = "Get every anime in the db"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<Anime> getAll(){ return animeService.getAll(); }



    @Operation(
            summary = "Get top anime, by score"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = " - getTopByYear")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/top")
    public List<Anime> getTop(@RequestParam Integer offset,
                                    @RequestParam Integer max,
                                    @RequestParam(required = false) Integer year
                                    ){
        Pageable page = PageRequest.of(offset, max);

        if(year == null)
            return animeService.getTopGlobal(page);
        else
            return animeService.getTopByYear(page, year);
    }



    @Operation(
            summary = "Get recent anime, calculated by year"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = " - getRecent")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/recent")
    public List<Anime> getRecent(@RequestParam Integer offset,
                                 @RequestParam Integer max){
        Pageable page = PageRequest.of(offset, max);

        return animeService.getRecent(page);
    }



    @Operation(
            summary = "Get list of anime, by an advanced search"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/advanced")
    public List<Anime> advancedQuery(@RequestParam(required = false) String type,
                                     @RequestParam(required = false) String status,
                                     @RequestParam(required = false) String source,
                                     @RequestParam(required = false) String genres,
                                     @RequestParam(required = false) String orderBy,
                                     @RequestParam(required = false) String direction,
                                     @RequestParam Integer offset,
                                     @RequestParam Integer max){

        return animeService.advancedQuery(type, status, source, genres, orderBy, direction, offset, max);
    }
}
