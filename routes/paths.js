var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//var db = mongojs('mongodb://admin:admin123@ds037827.mongolab.com:37827/around-the-world-app', ['paths']);
var db = mongojs('mongodb://mongo:27017/test', ['paths']);
/* GET All Todos */
router.get('/paths', function (req, res, next) {
    db.paths.find(function (err, paths) {
        if (err) {
            res.send(err);
        } else {
            res.json(paths);
        }
    });
});

/* GET One Todo with the provided ID */
/*
router.get('/todo/:id', function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});*/
/* POST/SAVE a Todo */

router.post('/path', function (req, res, next) {
    var path = req.body;
    if (!path.countries || !path.name) {
        res.status(400);
        res.json({
            "error": "countries or name is null"
        });
    } else {
        db.paths.save(path, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

/* PUT/UPDATE a Todo */
router.put('/path/:id', function (req, res, next) {
    var path = req.body;
    var updObj = {};
    console.log("path =");
    console.log(path);
    if (path.countries) {
        updObj.countries = path.countries;
        updObj.name = path.name;
    }
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.paths.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});
/* DELETE a Todo *//*
router.delete('/todo/:id', function (req, res) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});*/

module.exports = router;