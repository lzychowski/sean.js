const express = require('express');
var sequelize = require('../providers/sql');
var Group = require('../models/group');
var router = express.Router();

/*
 *  route: /api/groups/
 */

// get groups
router.get('/', function (req, res, next) {
    Group.findAll()
    .then(groups => {
        res.send(groups);
    })
    .catch(e =>{
        throw e;
    });
});

// get group by id
router.get('/:id', function (req, res, next) {
    Group.findById(req.params.id)
    .then(group => {
        res.send(group);
    })
    .catch(e =>{
        throw e;
    });
});

// get group's scopes by group id
router.get('/:id/scopes', function (req, res, next) {
    sequelize.query(
        'select gs.id, gs.group_id, gs.scope_id, s.name from group_scope gs inner join scope s on gs.scope_id = s.id where gs.group_id = ? and gs.active = true;',
        { raw: true, replacements: [ req.params.id ]}
    )
    .then(group_scopes => {
        group_scopes ? res.send(group_scopes[0]) : [];
    })
    .catch(e =>{
        throw e;
    });
});

// create group
router.post('/', function (req, res, next) {
    console.log(req.body);

    Group.findOrCreate({ where: { name: req.body.name }})
    .spread((group, created) => {
       res.send({
           created: created,
           group: group.get({ plain: true })
       });
    })
    .catch(e =>{
        throw e;
    });
});

// modify scopes
router.post('/:id/scopes', function (req, res, next) {
    console.log(req.body);

    let scopes = "{";
    for (let i = 0; i < req.body.length; i++){
        scopes += req.body[i] + ",";
    }

    scopes = scopes.substring(0, scopes.length - 1) + "}";

    sequelize.query(
        "SELECT * FROM modifyGroupScopes(?, ?);",
        { raw: true, replacements: [ req.params.id, scopes ]}
    )
    .then(data => {
        res.send(data);
    })
    .catch(e =>{
        throw e;
    });
});

module.exports = router;