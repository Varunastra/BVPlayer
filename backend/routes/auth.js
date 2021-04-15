const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function authRoute(app) {

    app.post("/api/token/obtain", async (req, res) => {
        const { login, password } = req.body;

        const user = await User.findOne({
            where: {
                login
            }
        });

        if (user != null) {
            if (await user.validatePassword(password)) {
                const { id } = user;
                const token = jwt.sign({ id, login }, secret);
                res.json({ token });
            }
            else {
                res.status(401).json({ message: "Wrong password" });
            }
        }
        else {
            res.status(401).json({ message: "User dosen't exists" });
        }
    });
}

module.exports = authRoute;