// Controller for User
import axios from "axios";

export async function findByUsername(req, res) {
  try {
    const { username } = req.params;
    const response = await axios.get(`http://localhost:3001/user/${username}/profile`);
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (findById):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function queryRatingsByUser(req, res) {
  try {
    const { username } = req.params;
    const response = await axios.get(`http://localhost:3001/user/${username}/ratings`);
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (findById):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}



