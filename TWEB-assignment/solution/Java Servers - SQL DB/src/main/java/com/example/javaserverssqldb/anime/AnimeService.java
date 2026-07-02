package com.example.javaserverssqldb.anime;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Pageable;


import java.util.List;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;

    @Autowired
    public AnimeService(AnimeRepository animeRepository){
        this.animeRepository = animeRepository;
    }

    @PersistenceContext
    private EntityManager entityManager;



    /**
     * Return an anime by its id
     * @param id anime to find
     * @return anime data
     */
    public Anime getById(Integer id){
        if(id == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing - getById");

        return this.animeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anime not found - getById"));
    }

    /**
     * Get List of anime with that title
     * @param title of the anime to look for
     * @return List of anime, if any
     */
    public List<Anime> getByTitle(String title){
        if(title == null || title.isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "title non valido - getByTitle");

        return this.animeRepository.findByTitleContainingIgnoreCase(title);
    }

    /**
     * Get all anime
     * @return all anime
     */
    public List<Anime> getAll(){ return this.animeRepository.findAll(); }

    /**
     * Get top anime by year
     * @param pageable pageable object with search parameters
     * @param year year to filter
     * @return List of anime, sorted by score
     */
    public List<Anime> getTopByYear(Pageable pageable, Integer year){
        if(pageable.getPageSize() < 1 || year == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopByYear");

        return this.animeRepository.findTopByYear(year, pageable);
    }

    /**
     * Get top anime by year
     * @param pageable pageable object with search parameters
     * @return List of anime, sorted by score
     */
    public List<Anime> getTopGlobal(Pageable pageable){
        if(pageable.getPageSize() < 1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopGlobal");

        return this.animeRepository.findTopGlobal(pageable);
    }

    /**
     * Get recent anime, calculated by year
     * @param pageable pageable object with search parameters
     * @return List of anime, sorted by year
     */
    public List<Anime> getRecent(Pageable pageable){
        if(pageable.getPageSize() < 1)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "max not valid - getTopGlobal");

        return this.animeRepository.findRecent(pageable);
    }

    /**
     * Advanced query, with pagination
     * @param type anime type
     * @param status anime status
     * @param genres anime genre to filter
     * @param orderBy order by
     * @param direction asc or desc
     * @param offset page number
     * @param max max results per page
     * @return list of anime
     */
    public List<Anime> advancedQuery(String type,
                                     String genres,
                                     String status,
                                     String source,
                                     String orderBy,
                                     String direction,
                                     Integer year,
                                     Integer offset, Integer max){

        List<String> allowedOrderBy = List.of("rank", "favorites", "score", "members", "year");
        List<String> allowedDirection = List.of("asc", "desc");
        List<String> allowedStatus = List.of("Currently Airing", "Finished Airing", "Not yet aired"); // -
        List<String> allowedType = List.of("TV", "Movie", "Music", "OVA", "ONA", "PV", "CM", "Special", "TV Special");
        List<String> allowedSource = List.of("Original", "Game", "Manga", "Web manga", "Book", "Picture book", "Novel",
                "Visual novel", "Light novel", "Web novel", "Mixed media", "4-koma manga", "Music", "Radio", "Card game", "Other");


        String jpql = "SELECT a FROM Anime a WHERE 1=1";


        if(type != null && allowedType.contains(type)) jpql += " AND a.type = :type";
        if(status != null && allowedStatus.contains(status)) jpql += " AND a.status = :status";
        if(genres != null) jpql += " AND LOWER(a.genres) LIKE LOWER(:genres)";
        if(source != null && allowedSource.contains(source)) jpql += " AND a.source = :source";
        if(year != null) jpql += " AND a.year = :year";
        if(orderBy != null && allowedOrderBy.contains(orderBy.toLowerCase())) {

            jpql += " AND a." + orderBy + " IS NOT NULL";
            jpql += " ORDER BY a." + orderBy;

            if(direction != null && allowedDirection.contains(direction.toLowerCase())) {
                jpql += " " + direction.toUpperCase();
            } else {
                jpql += " ASC"; // default
            }
        }

        TypedQuery<Anime> query = entityManager.createQuery(jpql, Anime.class);

        if (type != null) query.setParameter("type", type);
        if (status != null) query.setParameter("status", status);
        if (genres != null) query.setParameter("genres", "%" + genres + "%");
        if (source != null) query.setParameter("source", source);
        if (year != null) query.setParameter("year", year);

        query.setFirstResult(offset * max); // offset is the page number
        query.setMaxResults(max);

        return query.getResultList(); // No repository
    }


}
