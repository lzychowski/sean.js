var sequelize = require('../providers/sql');
const Sequelize = require('sequelize');

const Scope = sequelize.define('scope', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING(100),
    parent_scope: { 
        type: Sequelize.INTEGER,
        references: {
            model: Scope,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

module.exports = Scope;