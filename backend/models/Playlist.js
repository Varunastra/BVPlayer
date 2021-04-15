const { sequelize } = require("../sequelize");
const { STRING } = require("sequelize");

const Playlist = sequelize.define(
  "Playlist",
  {
    name: {
      type: STRING,
      field: "name",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Playlist };
