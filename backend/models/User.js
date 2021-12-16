const { sequelize } = require("../sequelize");
const { STRING, INTEGER, DATEONLY, ENUM } = require("sequelize");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: STRING,
      field: "login",
      unique: true,
    },
    password: {
      type: STRING,
      field: "password",
    },
    birthdate: {
      type: DATEONLY,
      field: "birthdate",
    },
    sex: {
      type: ENUM,
      values: ['Male', 'Female', 'Others']
    }
  },
  {
    freezeTableName: true,
  }
);

User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

User.beforeCreate((user) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => (user.password = hash))
    .catch((e) => {
      throw new Error("Cannot be hashed");
    });
});

module.exports = { User };
