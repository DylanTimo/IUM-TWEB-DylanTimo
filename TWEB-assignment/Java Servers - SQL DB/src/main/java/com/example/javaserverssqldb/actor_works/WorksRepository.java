package com.example.javaserverssqldb.actor_works;

import com.example.javaserverssqldb.anime.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface WorksRepository extends JpaRepository<Works, Long> {

    @Query("SELECT w FROM Works w WHERE w.animeId = :id")
    List<Works> findByAnimeId(Integer id);

    @Query("SELECT w FROM Works w WHERE w.actor.id = :id")
    List<Works> findByActorId(Integer id);

   // @Query("SELECT w FROM Works w WHERE w.characterId = :id")
    List<Works> findByCharacterId(Integer id);



}
