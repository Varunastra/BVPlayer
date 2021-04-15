const { sequelize } = require("../sequelize");
const { STRING, TEXT } = require("sequelize");

const Track = sequelize.define(
  "Track",
  {
    title: {
      type: STRING,
      name: "title",
    },
    author: {
      type: STRING,
      name: "author",
    },
    src: {
      type: STRING,
      name: "src",
    },
    poster: {
      type: STRING,
      name: "poster",
    },
    lyrics: {
      type: TEXT,
      name: "lyrics",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Track };
