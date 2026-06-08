// services/users_favs.js
import * as ratingService from "../services/users_ratings.js";


export async function queryByUsername(req, res) {
    try {
        const { username } = req.params;
        console.log("Filtro usato:", { username });
        const ratings = await ratingService.query({ username });
        res.json(ratings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore interno nel microservizio Mongo" });
    }
}

export async function queryByAnimeId(req, res) {
    try {
        const { id } = req.params;
        console.log("Filtro usato:", { id });
        const ratings = await ratingService.query({ anime_id: id });
        res.json(ratings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore interno nel microservizio Mongo" });
    }
}