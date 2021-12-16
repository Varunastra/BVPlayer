const { sequelize } = require("../sequelize");

const PlaylistTracks = sequelize.define(
  "Playlist_Tracks",
  {},
  {
    freezeTableName: true,
  }
);

module.exports = { PlaylistTracks };
