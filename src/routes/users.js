const express = require('express');
var sequelize = require('../providers/sql');
var User = require('../models/user');
var router = express.Router();

/*
 *  route: /api/users/
 */

// get users
router.get('/', function (req, res, next) {
    User.findAll().then(users => {
        res.send(users);
    });
});

// get user by id
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id).then(user => {
        res.send(user);
    });
});

// get users's groups by user id
router.get('/:id/groups', function (req, res, next) {
    sequelize.query(
        'select ug.id, ug.user_id, ug.group_id, g.name from user_group ug join "group" g on ug.group_id = g.id where ug.user_id = ? and ug.active = true;',
        { raw: true, replacements: [req.params.id]}
    ).then(groups => {
        groups ? res.send(groups[0]) : [];
        
    });
});

// get users's scopes by user id
router.get('/:id/scopes', function (req, res, next) {
    sequelize.query(
        'select us.id, us.user_id, us.scope_id, s.name from user_scope us join scope s on us.scope_id = s.id where us.user_id = ? and us.active = true;',
        { raw: true, replacements: [req.params.id]}
    ).then(scopes => {
        scopes ? res.send(scopes[0]) : [];
    });
});

// add group to user
router.post('/:id/groups/:group_id', function (req, res, next) {
    sequelize.query(
        'insert into user_group (user_id, group_id) values (?, ?)',
        { raw: true, replacements: [ req.params.id, req.params.group_id ]}
    ).then(data => {
        res.send(data);
    });
});

// add scope to user
router.post('/:id/scopes/:scope_id', function (req, res, next) {
    sequelize.query(
        'insert into user_scope (user_id, scope_id) values (?, ?)',
        { raw: true, replacements: [ req.params.id, req.params.scope_id ]}
    ).then(data => {
        res.send(data);
    });
});

// unassign user from a group
router.put('/groups/:id', function (req, res, next) {
    sequelize.query(
        'update user_group set active = false, updated_time = now() where id = ?;',
        { raw: true, replacements: [ req.params.id ]}
    ).then(data => {
        res.send(data);
    });
});

// unassign scope from a user
router.put('/scopes/:id', function (req, res, next) {
    sequelize.query(
        'update user_scopes set active = false, updated_time = now() where id = ?;',
        { raw: true, replacements: [ req.params.id ]}
    ).then(data => {
        res.send(data);
    });
});

module.exports = router;