// sequelize.js

const Sequelize = require('sequelize');
const connection = new Sequelize('fruits', 'alan', 'asdfghjkl', {
    dialect: 'postgres'
});

// test connection
connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const User = connection.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
});


module.exports.User = User;