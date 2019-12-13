const sequelize = require("../lib/db")
const Sequelize = require("sequelize")

/*
CREATE TABLE `users` (
    `id` varchar(255) NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `deletedAt` datetime DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

const User = sequelize.define("user", {
    id: {
        primaryKey:true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    }
},
    {
        tableName: "users"
    }
);


module.exports = User