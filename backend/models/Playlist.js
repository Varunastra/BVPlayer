const { sequelize } = require("../sequelize");
const { STRING } = require("sequelize");

const Playlist = sequelize.define(
  "Playlist",
  {
    name: {
      type: STRING,
      field: "name",
    },
    poster: {
      type: STRING,
      field: "poster",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Playlist };
