package com.example.javaserverssqldb.anime_stats;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Anime API", description = "Operations on AnimeDB")
@RestController
@RequestMapping("/anime/{animeId}")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService){
        this.statsService = statsService;
    }



    @Operation(
            summary = "Get recent anime, calculated by year"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = " - getRecent"),
            @ApiResponse(responseCode = "404", description = " - getRecent")
    })
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/stats")
    public Stats getStatsById(@PathVariable Integer animeId){
        return statsService.getById(animeId);
    }
}
