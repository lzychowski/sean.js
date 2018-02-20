var sequelize = require('../providers/sql');
const Sequelize = require('sequelize');

const Group = sequelize.define('group', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    parent_group: { 
        type: Sequelize.INTEGER,
        references: {
            model: this, // test this
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

module.exports = Group;