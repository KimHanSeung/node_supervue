const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/list', function (req, res) {

    Movie.findAll().then((movies) => {
        if (!movies.length) return res.status(404).send({ err: 'Movies not found' });
        res.send(movies);
    }).catch(err => res.status(500).send(err));

});

router.get('/:id/detail', function (req, res) {

    //Movie.findOne 으로도 가능하다.
    Movie.findByObjectId(req.params.id).then((movie) => {
        if (!movie) return res.status(404).send({ err: 'Movie not found' });
        res.send(movie);
    }).catch(err => res.status(500).send(err));

});

router.post('/', function(req, res){

    Movie.saveMovie(req.body)
        .then(movie => res.send(movie))
        .catch(err => res.status(500).send(err));

});

router.put('/:id', function(req, res){

    Movie.updateMovie(req.params.id, req.body)
        .then(movie => res.send(movie))
        .catch(err => res.status(500).send(err));

});

router.delete('/:id', function (req, res) {

    Movie.deleteMovie({ _id: req.params.id })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;