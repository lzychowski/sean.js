var sequelize = require('../providers/sql');
const Sequelize = require('sequelize');

const Group = sequelize.define('group', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING(100),
    parent_group: { 
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

module.exports = Group;