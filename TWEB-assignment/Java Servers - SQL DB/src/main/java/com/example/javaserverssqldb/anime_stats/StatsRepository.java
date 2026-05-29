package com.example.javaserverssqldb.anime_stats;

import com.example.javaserverssqldb.anime.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatsRepository extends JpaRepository<Stats, Integer> {

    Optional<Stats> findById(Integer id);
}
