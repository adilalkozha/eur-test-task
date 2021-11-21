const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const File = sequelize.define(
  "File",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = File;
