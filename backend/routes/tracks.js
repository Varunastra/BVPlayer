const { checkToken } = require("../middlewares/auth");
const multer = require("multer");
const mm = require("music-metadata");
const mime = require("mime-types");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const {
  Track,
  Playlist,
  Genre,
  PlaylistTracks,
  Like,
} = require("../models/index");

const memoryCache = {};

let cacheTrackIndex = 0;

const addToCache = (key, value) => {
  memoryCache[key] = {
    data: value,
    timer: setTimeout(() => {
      delete memoryCache[key];
    }, 1000 * 60 * 2),
  };
};

const removeFromCache = (key) => {
  clearTimeout(memoryCache[key].timer);
  delete memoryCache[key];
};

const getFromCache = (key) => {
  return memoryCache[key].data;
};

const tracksStorage = multer.memoryStorage();
const postersStorage = multer.memoryStorage();

const uploadTrack = multer({ storage: tracksStorage });
const uploadPoster = multer({ storage: postersStorage });

function tracksRoute(app) {
  app.post("/api/playlists/:id/tracks", checkToken, async (req, res) => {
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
      if (!playlist.poster) {
        playlist.poster = track.poster;
      }
      await Promise.all([playlist.addTrack(track), playlist.save()]);
      res.json({ message: "Track uploaded successufuly", id: track.id });
    }
  });

  app.post(
    "/api/track-upload",
    [checkToken, uploadTrack.single("track")],
    async (req, res) => {
      const { buffer, mimetype } = req.file;
      const { id: userId } = req.decoded;
      const {
        format: { duration },
        common: { title, picture, artist },
      } = await mm.parseBuffer(buffer, "audio/mpeg");
      addToCache(cacheTrackIndex++, {
        picture,
        title,
        artist,
        userId,
        duration,
        track: { buffer, type: mime.extension(mimetype) },
      });
      let response = {
        title,
        artist,
        cacheTrackIndex: cacheTrackIndex - 1,
        duration,
      };
      if (picture) {
        const [{ data }] = picture;
        response = { ...response, poster: { buffer: data.toString("base64") } };
      }
      res.json(response);
    }
  );

  app.post(
    "/api/playlists/:id/track-save",
    [checkToken, uploadPoster.single("poster")],
    async (req, res) => {
      const { id } = req.params;
      const { cacheTrackIndex, title, artist } = req.body;
      const { id: UserId } = req.decoded;
      const trackInfo = getFromCache(cacheTrackIndex);
      if (trackInfo.userId === UserId) {
        const posterPath = `/posters/track-${UserId}-${Date.now()}.${mime.extension(
          trackInfo.picture[0].format
        )}`;
        const trackPath = `/tracks/track-${UserId}-${Date.now()}.${
          trackInfo.track.type
        }`;
        fs.createWriteStream(`${process.cwd()}${posterPath}`).write(
          req?.file?.poster || trackInfo.picture[0].data
        );
        fs.createWriteStream(`${process.cwd()}${trackPath}`).write(
          trackInfo.track.buffer
        );
        const [newTrack, playlist] = await Promise.all([
          Track.create({
            src: trackPath,
            poster: posterPath,
            title: title || trackInfo.title,
            artist: artist || trackInfo.artist,
            duration: Math.round(trackInfo.duration),
            UserId,
          }),
          Playlist.findOne({
            where: {
              id,
            },
          }),
        ]);
        if (!playlist.poster) {
          playlist.poster = newTrack.poster;
        }
        await Promise.all([playlist.addTrack(newTrack), playlist.save()]);
        removeFromCache(cacheTrackIndex);
        res.json({ message: "Track uploaded successufuly", id: newTrack.id });
      }
    }
  );

  app.patch(
    "/api/tracks/:id",
    [checkToken, uploadPoster.single("poster")],
    async (req, res) => {
      const { id } = req.params;
      const { id: UserId } = req.decoded;

      let posterPath;

      if (req.file) {
        const { buffer, mimetype } = req.file;
        posterPath = `/tracks/track-${UserId}-${Date.now()}.${mime.extension(
          mimetype
        )}`;
        fs.createWriteStream(`${process.cwd()}${posterPath}`).write(buffer);
      }

      const track = await Track.findByPk(id);

      if (track) {
        const updateFields = posterPath
          ? { ...req.body, poster: posterPath }
          : req.body;

        if ("liked" in updateFields) {
          if (updateFields.liked === "true") {
            Like.upsert({
              rating: 1,
              UserId: req.decoded.id,
              TrackId: id,
            });
          } else {
            Like.upsert({
              rating: 0,
              UserId: req.decoded.id,
              TrackId: id,
            });
          }
        }

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
            { artist: { [Op.iLike]: `%${search}%` } },
          ],
        },
      });
      res.json(tracks);
    } else {
      res.status(400).json({ error: "Wrong fields provided" });
    }
  });

  app.post("/api/tracks/:id/rate", checkToken, async (req, res) => {
    const { id: TrackId } = req.params;
    const { id: UserId } = req.decoded;
    const { rating } = req.body;

    const track = await Track.findByPk(TrackId);
    if (track) {
      track.liked = rating > 0;
      await track.save();
    }

    const like = await Like.findOne({
      where: { UserId, TrackId },
    });

    if (like) {
      if (rating >= 0) {
        like.rating = rating;
        like.save();
      } else {
        like.destroy();
      }
    } else {
      Like.create({ UserId, TrackId, rating });
    }
    res.json({ message: "Rated your track" });
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
        track.poster &&
          (track.poster = `${process.env["BACKEND_URL"]}:${process.env["BACKEND_PORT"]}${track.poster}`);
        res.json(track);
      } else {
        res.json({ error: "No track with that id found" });
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
