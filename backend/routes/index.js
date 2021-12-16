const authRoute = require("./auth");
const playlistsRoute = require("./playlists");
const usersRoute = require("./users");
const tracksRoute = require("./tracks");

function initializeRoutes(app) {
  authRoute(app);
  playlistsRoute(app);
  usersRoute(app);
  tracksRoute(app);
}

module.exports = initializeRoutes;
