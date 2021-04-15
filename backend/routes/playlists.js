const { checkToken } = require("../middlewares/auth");
const { Playlist, Track, Genre } = require("../models/index");
const { like } = require("sequelize").Op;

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

        if (id) {
            const tracks = await Playlist.findOne({
                include: [
                    {
                        model: Track,
                        as: "tracks",
                        through: {
                            attributes: [],
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                        include: [
                            {
                                model: Genre,
                                as: "genres",
                                through: {
                                    attributes: [],
                                },
                            },
                        ],
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: {
                    id,
                },
            });
            res.json(tracks);
        } else {
            res.json({ error: "'id' field is not provided" });
        }
    });

    app.get("/api/playlists", async (req, res) => {
        const searchQuery = getSearchQuery(req.query);

        const playlist = await Playlist.findOne({
            where: {
                ...searchQuery,
            },
        });

        res.json(playlist.toJSON());
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
