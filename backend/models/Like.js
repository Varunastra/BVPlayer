const { INTEGER } = require("sequelize");
const { sequelize } = require("../sequelize");

const Like = sequelize.define(
  "Like",
  {
    rating: {
      type: INTEGER,
      field: "rating",
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { Like };
