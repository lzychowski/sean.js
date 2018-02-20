const express = require('express');
var sequelize = require('../providers/sql');
var Scope = require('../models/scope');
var router = express.Router();

/*
 *  route: /api/scopes/
 */

 // get scopes
router.get('/', function (req, res, next) {
    Scope.findAll()
    .then(scopes => {
        res.send(scopes);
    })
    .catch(e =>{
        throw e;
    });
});

// get scope by id
router.get('/:id', function (req, res, next) {
    Scope.findById(req.params.id)
    .then(scope => {
        res.send(scope);
    })
    .catch(e =>{
        throw e;
    });
});

// create scope
router.post('/', function (req, res, next) {
    console.log(req.body);

    Scope.findOrCreate({ where: { name: req.body.name }})
    .spread((scope, created) => {
       res.send({
           created: created,
           scope: scope.get({ plain: true })
       });
    })
    .catch(e =>{
        throw e;
    });
});


module.exports = router;