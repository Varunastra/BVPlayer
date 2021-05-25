const { checkToken } = require("../middlewares/auth");
const { Playlist, Track } = require("../models/index");
const {
  Op: { like },
  QueryTypes,
} = require("sequelize");
const { sequelize } = require("../sequelize");
const { recommendations } = require("../utils/recommendations");

function getSearchQuery(queryParams) {
  const searchQuery = {};

  Object.keys(queryParams).forEach((key) => {
    searchQuery[key] = { [like]: queryParams[key] + "%" };
  });

  return searchQuery;
}

function playlistsRoute(app) {
  app.get("/api/playlists/:id", checkToken, async (req, res) => {
    const { id } = req.params;
    const { id: UserId } = req.decoded;

    let playlist;

    if (!id) {
      res.json({ error: "'id' field is not provided" });
    }

    if (id === "liked") {
      const tracks = await sequelize.query(
        `
          select
            t.*
          from
            "Track" t
          inner join "Like" l on
            t.id = l."TrackId"
          where
            l."UserId" = ? and
            l.rating > 0
      `,
        {
          replacements: [UserId],
          type: QueryTypes.SELECT,
        }
      );
      playlist = { ...recommendations.likes, tracks };
    } else {
      let [tracks, singlePlaylist] = await Promise.all([
        sequelize.query(
          `
          select
            distinct t.*,
            l.rating
          from
            "Playlist" p
          inner join "Playlist_Tracks" pt on
            p.id = pt."PlaylistId"
          inner join "Track" t on
            pt."TrackId" = t.id
            and p.id = ?
          left outer join "Like" l on
            t.id = l."TrackId"
            and l."UserId" = ?
        `,
          {
            replacements: [id, UserId],
            type: QueryTypes.SELECT,
          }
        ),
        Playlist.findByPk(id, {
          raw: true,
        }),
      ]);
      playlist = { ...singlePlaylist, tracks };
      if (playlist.poster) {
        playlist.poster = `${process.env["BACKEND_URL"]}:${process.env["BACKEND_PORT"]}${playlist.poster}`;
      }
    }
    playlist.tracks.forEach(
      (track) =>
        track.poster &&
        (track.poster = `${process.env["BACKEND_URL"]}:${process.env["BACKEND_PORT"]}${track.poster}`)
    );
    res.json(playlist);
  });

  app.get("/playlist-recommendations", async (req, res) => {
    const { UserId } = req.decoded;
  });

  app.get("/api/playlists", async (req, res) => {
    const searchQuery = getSearchQuery(req.query);

    const playlist = await Playlist.findOne({
      where: {
        ...searchQuery,
      },
    });

    res.json(playlist);
  });

  app.post("/api/playlists", checkToken, async (req, res) => {
    const { name, tracks } = req.body;

    if (name) {
      const playlist = await Playlist.create({
        UserId: req.decoded.id,
        name,
      });
      if (tracks) {
        playlist.setTracks(tracks);
      }
      res.json({
        message: "Playlist created succesfully",
        id: playlist.id,
      });
    } else {
      res.json({ error: "Wrong fields provided" });
    }
  });

  app.post("/api/playlists/:id", checkToken, async (req, res) => {
    const { method } = req.query;
    const { newName } = req.body;
    const { id } = req.params;

    if (method && method === "duplicate") {
      const playlist = await Playlist.findByPk(id, {
        include: [
          {
            model: Track,
            as: "tracks",
          },
        ],
      });
      const newPlaylist = await Playlist.create({
        UserId: req.decoded.id,
        name: newName,
      });
      newPlaylist.setTracks(playlist.tracks);
      res.json({
        message: "Playlist successfully duplicated",
        id: newPlaylist.id,
      });
    }
  });

  app.delete("/api/playlists/:id", checkToken, async (req, res) => {
    const { id } = req.params;

    if (id) {
      const playlist = await Playlist.findByPk(id);
      if (playlist.UserId === req.decoded.id) {
        await playlist.destroy();
        res.json({ message: "Playlist deleted succesfully" });
      } else {
        res.json({ error: "Insufficient privilleges" });
      }
    } else {
      res.json({ error: "Wrong fields provided" });
    }
  });

  app.patch("/api/playlists/:id", checkToken, async (req, res) => {
    const { id } = req.params;

    if (id) {
      const playlist = await Playlist.findByPk(id);
      if (playlist.UserId === req.decoded.id) {
        await playlist.update({
          ...req.body,
        });
        res.json({ message: "Playlist updated succesfully" });
      } else {
        res.json({ error: "Insufficient privilleges" });
      }
    } else {
      res.json({ error: "Wrong fields provided" });
    }
  });
}

module.exports = playlistsRoute;
