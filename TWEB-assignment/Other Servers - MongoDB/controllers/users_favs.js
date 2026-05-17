// Controller
import * as users_favs_service from '../services/users_favs.js';

export async function query(req, res) {
    try {
        const { username } = req.params;
        const ratings = await users_favs_service.query({ username });
        res.json(ratings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore interno nel microservizio Mongo" });
    }
}
