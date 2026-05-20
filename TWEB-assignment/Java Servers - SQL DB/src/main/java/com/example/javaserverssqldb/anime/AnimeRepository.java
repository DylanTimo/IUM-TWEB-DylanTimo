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

    @Query("SELECT a FROM Anime a WHERE a.year = :year ORDER BY a.score DESC")
    List<Anime> findTopByYear(@Param("year") Integer year, Pageable pageable);

}
