const axios = require("axios").default;
const FormData = require("form-data");
const { Like, User } = require("../models/index");
const { sequelize } = require("../sequelize");
const { QueryTypes } = require("sequelize");

const httpClient = axios.create({
  baseURL: "http://172.20.0.3:5000/api/",
});

const getGenres = async (track) => {
  const formData = new FormData();
  formData.append("track", track);
  return httpClient.post("/tracks/predict-genre", formData, {
    headers: formData.getHeaders(),
  });
};

const getRecommendations = async (UserId) => {
  const [tracks, likes, users, user] = await Promise.all([
    sequelize.query(
      `
      select
        t.*,
        string_agg(g."name", ',') as "genres"
      from
        "Track" t
      inner join "Track_Genres" tg on
        t.id = tg."TrackId"
      inner join "Genre" g on
        g.id = tg."GenreId"
      group by t.id;`,
      { type: QueryTypes.SELECT }
    ),
    Like.findAll({ raw: true }),
    User.findAll({ raw: true }),
    User.findByPk(UserId, { raw: true }),
  ]);
  const { data: recommendations } = await httpClient.post(
    "/tracks/recommendations",
    {
      tracks,
      likes,
      users: users.map((user) => {
        user.age = new Date(user.birthdate).getFullYear() - new Date().getFullYear();
        return user;
      }),
      user,
    }
  );
  const result = recommendations.recommendations.map((id) => {
    for (track of tracks) {
      if (track.id === id) {
        return track;
      }
    }
  });
  return result;
};

module.exports = { getRecommendations, getGenres };
