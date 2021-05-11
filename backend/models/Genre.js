const { sequelize } = require("../sequelize");
const { STRING } = require("sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    name: {
      type: STRING,
      field: "name",
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Genre };
