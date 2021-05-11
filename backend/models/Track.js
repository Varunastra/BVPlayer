const { sequelize } = require("../sequelize");
const { STRING, TEXT, INTEGER, BOOLEAN } = require("sequelize");

const Track = sequelize.define(
  "Track",
  {
    title: {
      type: STRING,
      name: "title",
    },
    artist: {
      type: STRING,
      name: "artist",
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
    duration: {
      type: INTEGER,
      name: "duration",
    },
    liked: {
      type: BOOLEAN,
      name: "liked",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Track };
