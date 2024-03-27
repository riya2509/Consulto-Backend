import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Master = sequelize.define(
  "master",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    college: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },

    name: {
      type: DataTypes.STRING, //string , required, min 2 , max 50
    },
    password: {
      type: DataTypes.STRING,
    },
    phoneFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING, //number, optional, length 10
    },
    token: {
      type: DataTypes.STRING, //length 6 digit number, required ,
    },
    expireAt: {
      type: DataTypes.DATE, // required , string
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    invalidLogins: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  },
  {}
);
export default Master;
