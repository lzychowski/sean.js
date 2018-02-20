const express = require('express');
var sequelize = require('../providers/sql');
var Group = require('../models/group');
var router = express.Router();

/*
 *  route: /api/groups/
 */

 // get groups
 router.get('/', function (req, res, next) {
    Group.findAll().then(groups => {
        res.send(groups);
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
    });
});

module.exports = router;