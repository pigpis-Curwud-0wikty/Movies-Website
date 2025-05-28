const axios = require("axios");
const { ENV_VARS } = require("../config/envVars.js");

const fetchFromTMDB = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ENV_VARS.TMBD_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data from TMDB:",
      error.response?.status,
      error.message
    );
    throw new Error("Failed to fetch data from TMDB");
  }
};

module.exports = { fetchFromTMDB };

