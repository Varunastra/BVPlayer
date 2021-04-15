const { checkToken } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { Track, Playlist, Genre, PlaylistTracks } = require("../models/index");

const tracksStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/tracks/`);
  },
  filename: function (req, file, cb) {
    const { id } = req.decoded;
    cb(null, `track-${Date.now()}${id}${path.extname(file.originalname)}`);
  },
});

const postersStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/posters/`);
  },
  filename: function (req, file, cb) {
    const { id } = req.decoded;
    cb(null, `track-${Date.now()}${id}${path.extname(file.originalname)}`);
  },
});

const uploadTrack = multer({ storage: tracksStorage });
const uploadPoster = multer({ storage: postersStorage });

function tracksRoute(app) {
  app.post(
    "/api/playlists/:id/tracks",
    [checkToken, uploadTrack.single("track")],
    async (req, res) => {
      const { id } = req.params;
      const { title, author, id: trackId } = req.body;
      const { id: UserId } = req.decoded;

      if (trackId) {
        const track = await Track.findByPk(trackId);
        const playlistTrack = await PlaylistTracks.findOne({
          where: {
            PlaylistId: id,
            TrackId: trackId,
          },
        });
        if (!playlistTrack) {
          const playlist = await Playlist.findByPk(id);
          playlist.addTrack(track);
          res.json({ message: "Track added successfully" });
        } else {
          res.status(409).json({
            error: "Track already in playlist",
          });
        }
      } else {
        const { filename } = req.file;
        const [track, playlist] = await Promise.all([
          Track.create({
            src: `/tracks/${filename}`,
            UserId,
            title,
            author,
          }),
          Playlist.findOne({
            where: {
              id,
            },
          }),
        ]);
        await playlist.addTrack(track);
        res.json({ message: "Track uploaded successufuly", id: track.id });
      }
    }
  );

  // app.get("/api/sign-s3", async (req, res) => {
  //     const { type, kind } = req.query;

  //     const filename = `${kind}s/${kind}-${Date.now()}`;

  //     try {
  //         const signedRequest = await s3.getSignedUrlPromise("putObject", {
  //             Bucket: "bvplayer",
  //             ContentType: type,
  //             ACL: "public-read",
  //             Key: filename,
  //         });
  //         res.json({
  //             url: `https://bvplayer.s3.amazonaws.com/${filename}`,
  //             signedRequest
  //         });
  //     } catch (e) {
  //         console.log(e);
  //         res.json({ error: e.message });
  //     }
  // });

  app.patch(
    "/api/tracks/:id",
    [checkToken, uploadPoster.single("poster")],
    async (req, res) => {
      const { id } = req.params;

      let poster;

      if (req.file) {
        poster = req.file.filename;
      }

      const track = await Track.findByPk(id);

      if (track) {
        const updateFields = poster
          ? { ...req.body, poster: `/posters/${poster}` }
          : req.body;

        await track.update({
          ...updateFields,
        });

        res.json({ message: "Fields updated succussfully" });
      } else {
        res.json({ error: "Wrong fields provided" });
      }
    }
  );

  app.get("/api/tracks", checkToken, async (req, res) => {
    const { search } = req.query;

    if (search) {
      const tracks = await Track.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } },
          ],
        },
      });
      res.json(tracks);
    } else {
      res.status(400).json({ error: "Wrong fields provided" });
    }
  });

  app.get("/api/tracks/:id", checkToken, async (req, res) => {
    const { id } = req.params;

    if (id) {
      const track = await Track.findByPk(id, {
        include: [
          {
            model: Genre,
            as: "genres",
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (track) {
        res.json(track);
      } else {
        res.json({ error: "No track with that id found " });
      }
    } else {
      res.status(400).json({ error: "Wrong fields provided" });
    }
  });

  app.delete(
    "/api/playlists/:playlistId/tracks/:trackId",
    checkToken,
    async (req, res) => {
      const { playlistId, trackId } = req.params;

      const playlist = await Playlist.findByPk(playlistId);
      if (playlist) {
        playlist.removeTrack([trackId]);

        res.json({ message: "Track removed successfully" });
      } else {
        res.json({ error: "Wrong id provided" });
      }
    }
  );

  app.post("/api/tracks/:id/genres", checkToken, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (id) {
      const track = await Track.findByPk(id);
      const [genre, _] = await Genre.findOrCreate({
        where: {
          name,
        },
        defaults: {
          name,
        },
      });
      await track.addGenres(genre);
      res.json({
        message: "Genre added successfully",
        id: genre.id,
      });
    } else {
      res.status(400).json({
        error: "Wrong fields provided",
      });
    }
  });

  app.delete("/api/tracks/:id/genres", checkToken, async (req, res) => {
    const { id } = req.params;
    const { id: genreId } = req.body;

    if (id) {
      const track = await Track.findByPk(id);
      const genre = await Genre.findByPk(genreId);
      await track.removeGenres(genre);
      res.json({ message: "Genre removed successfully" });
    } else {
      res.status(400).json({
        error: "Wrong fields provided",
      });
    }
  });
}

module.exports = tracksRoute;
