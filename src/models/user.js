var sequelize = require('../providers/sql');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email_address: Sequelize.STRING(100),
    first_name: Sequelize.STRING(100),
    last_name: Sequelize.STRING(100)
});

module.exports = User;