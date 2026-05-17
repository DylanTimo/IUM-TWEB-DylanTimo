// Controller
import * as users_profiles_service from "../services/users_profiles.js";

export async function query(req, res) {
    try {
        const { username } = req.params;
        const ratings = await users_profiles_service.query({ username });
        res.json(ratings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore interno nel microservizio Mongo" });
    }
}
