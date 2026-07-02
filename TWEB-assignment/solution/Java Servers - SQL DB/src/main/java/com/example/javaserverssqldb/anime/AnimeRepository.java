package com.example.javaserverssqldb.anime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Integer> {

    Optional<Anime> findById(Integer id);

    List<Anime> findByTitle(String title);

    List<Anime> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT a " +
            "FROM Anime a " +
            "WHERE a.year = :year " +
            "AND a.score IS NOT NULL " +
            "ORDER BY a.score DESC," +
            "a.id ASC")
    List<Anime> findTopByYear(@Param("year") Integer year, Pageable pageable);

    @Query("SELECT a " +
            "FROM Anime a " +
            "WHERE a.score IS NOT NULL " +
            "ORDER BY a.score DESC, " +
            "a.id ASC")
    List<Anime> findTopGlobal(Pageable pageable);

    @Query("SELECT a " +
            "FROM Anime a " +
            "WHERE a.year IS NOT NULL " +
            "ORDER BY a.year DESC," +
            "a.id ASC")
    List<Anime> findRecent(Pageable pageable);


}
