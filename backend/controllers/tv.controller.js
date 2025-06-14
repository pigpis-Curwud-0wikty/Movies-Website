const { fetchFromTMDB } = require("../services/tmdb.service.js");

async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomTv });
  } catch (error) {
    console.error("Error fetching trending TV shows:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvTrailer(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    console.error("Error fetching TV trailers:", error.message);
    if (error.response?.status === 404) {
      return res
        .status(404)
        .json({ success: false, message: "TV show not found" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error("Error fetching TV details:", error.message);
    if (error.response?.status === 404) {
      return res
        .status(404)
        .json({ success: false, message: "TV show not found" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getSimilarTv(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.error("Error fetching similar TV shows:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getTvByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching TV shows by category:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getTrendingTv,
  getTvTrailer,
  getTvDetails,
  getSimilarTv,
  getTvByCategory,
};
