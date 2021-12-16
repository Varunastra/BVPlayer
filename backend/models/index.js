const { Track } = require("./Track");
const { Playlist } = require("./Playlist");
const { User } = require("./User");
const { PlaylistTracks } = require("./PlaylistTracks");
const { Genre } = require("./Genre");
const { Like } = require("./Like");

Track.belongsToMany(Genre, { through: "Track_Genres", as: "genres" });
Genre.belongsToMany(Track, { through: "Track_Genres", as: "track" });

Playlist.belongsToMany(Track, { through: PlaylistTracks, as: "tracks" });
Track.belongsToMany(Playlist, { through: PlaylistTracks, as: "playlist" });

User.hasMany(Playlist);
Playlist.belongsTo(User);

User.hasMany(Track);
Track.belongsTo(User);

User.belongsToMany(Track, { through: Like, as: "trackLikes" });
Track.belongsToMany(User, { through: Like, as: "userLikes" });

module.exports = { Track, Playlist, User, PlaylistTracks, Genre, Like };
