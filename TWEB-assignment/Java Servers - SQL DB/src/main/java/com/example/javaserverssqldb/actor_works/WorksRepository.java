package com.example.javaserverssqldb.actor_works;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WorksRepository extends JpaRepository<Works, Long> {

    Optional<Works> findById(long id);

    @Query("SELECT w FROM Works w WHERE w.animeId = :id")
    List<Works> findByAnimeId(Integer id);

    @Query("SELECT w FROM Works w WHERE w.actor.id = :id")
    List<Works> findByActorId(Integer id);

   // @Query("SELECT w FROM Works w WHERE w.characterId = :id")
    List<Works> findByCharacterId(Integer id);



}
