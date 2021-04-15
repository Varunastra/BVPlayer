const { sequelize } = require("../sequelize");
const { Track } = require("./Track");
const { STRING } = require("sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    name: {
      type: STRING,
      field: "name",
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Track.belongsToMany(Genre, { through: "Track_Genres", as: "genres" });
Genre.belongsToMany(Track, { through: "Track_Genres", as: "track" });

module.exports = { Genre };
