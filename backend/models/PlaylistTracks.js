const { sequelize } = require("../sequelize");
const { Playlist } = require("./Playlist");
const { Track } = require("./Track");

const PlaylistTracks = sequelize.define(
  "Playlist_Tracks",
  {},
  {
    freezeTableName: true,
  }
);

Playlist.belongsToMany(Track, { through: PlaylistTracks, as: "tracks" });
Track.belongsToMany(Playlist, { through: PlaylistTracks, as: "playlist" });

module.exports = { PlaylistTracks };
