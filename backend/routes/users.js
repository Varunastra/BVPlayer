const { checkToken } = require("../middlewares/auth");
const { Playlist, User } = require("../models/index");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;


function userRoutes(app) {
    app.get("/api/users/:id", checkToken, async (req, res) => {
        const { id } = req.params;

        if (id === "me") {
            const user = await User.findOne({
                include: [{
                    model: Playlist
                }],
                where: {
                    id: req.decoded.id
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                }
            });

            res.json(user.toJSON());
        }
        else {
            res.json("Not implemented");
        }
    });

    app.get("/api/users/:id/playlists", checkToken, async (req, res) => {
        const { id } = req.params;
        
        if (id) {
            const searchId = id === "me" ? req.decoded.id : id;
            const playlists = await Playlist.findAll({
                where: {
                    UserId: searchId
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });

            res.json(playlists);
        }
    });

    app.post("/api/users", async (req, res) => {
        const { login, password } = req.body;

        if (login && password) {
            const [user, isCreated] = await User.findOrCreate({
                where: {
                    login
                },
                defaults: {
                    login,
                    password
                }
            });

            if (isCreated) {
                const token = jwt.sign({ login, id: user.id }, secret);
                res.json({ message: "User created successfully", token });
            }
            else {
                res.status(400).json({ message: "User already exist"});
            }
        }
        else {
            res.json({ message: "Wrong fields provided" });
        }
    });
}

module.exports = userRoutes;