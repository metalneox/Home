const sequelize = require("../lib/db")
const Sequelize = require("sequelize")
const User = require("./User")

/*
    CREATE TABLE `houses` (
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `maxPlaces` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `fk_users` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `deletedAt` datetime DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

const House = sequelize.define("house", {
    id: {
        primaryKey:true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
    },
    maxPlaces: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
},
    {
        tableName: "houses"
    }
);


House.belongsTo(User, { 
    foreignKey: 'fk_users' 
})


module.exports = House