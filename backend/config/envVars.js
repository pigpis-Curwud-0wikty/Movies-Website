require('dotenv').config();

const ENV_VARS = {
  MONGOS_URL: process.env.MONGOS_URL,
  PORT: process.env.PORT || 5000 ,//"https://movies-website-bice.vercel.app/",
  JWT_SECRET: process.env.JWT_SECRET || "my_really_hard_to_decode_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
  TMBD_API_KEY: process.env.TMBD_API_KEY || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmVkNTE4MzA5OTdjMjYyMzY3YTc4NTA5M2JkZTFlZSIsIm5iZiI6MTc0MzA4MDMyNC41Mywic3ViIjoiNjdlNTRiODQzM2E3NDM0MWUzMTBhMzc0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Q_EdlyPIXxQqb2WHQ81das5nnC3CzRaiHem-TOjSers"
};

module.exports = { ENV_VARS };