package com.example.javaserverssqldb.actors;

import com.example.javaserverssqldb.anime.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Integer> {

    Optional<Actor> findById(Integer id);
}
