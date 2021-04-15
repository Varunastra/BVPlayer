const { sequelize } = require("../sequelize");
const { STRING, INTEGER } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Playlist } = require("./Playlist");
const { Track } = require("./Track");

const User = sequelize.define("User", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: STRING,
        field: "login",
        unique: true
    },
    password: {
        type: STRING,
        field: "password"
    },
}, {
    freezeTableName: true
});

User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => user.password = hash)
        .catch(e => { throw new Error("Cannot be hashed") });
});

User.hasMany(Playlist);
Playlist.belongsTo(User);

User.hasMany(Track);
Track.belongsTo(User);

module.exports = { User };