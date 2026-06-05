// Controllers for Anime Details
import axios from "axios";

export async function findById(req, res) {
  try {
    const { animeId } = req.params;
    const response = await axios.get(`http://localhost:8082/anime/${animeId}`);
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (findById):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function findByTitle(req, res) {
  try{
    const { title } = req.query;
    const response = await axios.get(`http://localhost:8082/anime/title?title=${title}`);
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      console.error("Errore nel main server (findByTitle):", err.message);
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function queryTop(req, res) {
  try {
    const { offset, max, year } = req.query;
    const response = await axios.get("http://localhost:8082/anime/top", {
      params: { offset, max, year }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (queryTop):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function queryRecent(req, res) {
  try {
    const { offset, max } = req.query;
    const response = await axios.get("http://localhost:8082/anime/recent", {
      params: { offset, max}
    });
    res.json(response.data);
  } catch (err) {
    console.error("Errore nel main server (queryRecent):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function queryStats(req, res) {
  try{
    const { animeId } = req.params;
    const response = await axios.get(`http://localhost:8082/anime/${animeId}/stats`);
    res.json(response.data)
  } catch (err) {
    console.error("Errore nel main server (queryStats):", err.message);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data); // api server error
    }
    res.status(500).json({ message: "Errore interno nel main server" });
  }
}

export async function queryWithFilters(req, res) {
  try {
    const { offset, max, year, status, order, direction, type, source } = req.query;

    const response = await axios.get("http://localhost:8082/anime/top", {
      params: { offset, max, year, status, order, direction, type, source }
    });

    res.json(response.data);

  } catch (err) {
    console.error("Errore nel main server (queryTop):", err.message);
    res.status(500).json({ message: "Errore interno" });
  }
}



