// Controller for Actors
import axios from "axios";

export async function queryAnimeVoicesByAnimeId(req, res) {
  try {
    const { animeId } = req.query;
    const response = await axios.get(`http://localhost:8082/actors/byAnime?animeId=${animeId}`);
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (queryAnimeVoicesByAnimeId):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}