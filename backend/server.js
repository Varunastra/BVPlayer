require('dotenv').config();
const express = require("express");
const { sequelize } = require("./sequelize");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const initializeRoutes = require("./routes/index");

const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/tracks", express.static(process.cwd() + "/tracks"));
app.use("/posters", express.static(process.cwd() + "/posters"));
app.use(express.static(path.join(__dirname, "build")));
initializeRoutes(app);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
        "Connection to DB has been established successfully."
    );
})();

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = app;
