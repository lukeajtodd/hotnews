const express = require('express');
const router = express.Router();
const passport = require('passport');
const shortid = require('shortid');

const User = require('@models/User');
const Favourite = require('@models/Favourite');

// @route   GET api/favourites/
// @desc    Get a users favourite tracks
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        User.get({ id: req.user.id }).then(user => {
            Favourite.getAll()
                .then(favourites => {
                    let favouritesFiltered = favourites.filter(
                        fave => fave.userId === user.id
                    );
                    if (favouritesFiltered.length) {
                        return res.json(favouritesFiltered);
                    } else {
                        errors.nofavouritesfound =
                            'No favourites found for this user.';
                        res.status(404).json(errors);
                    }
                })
                .catch(err => {
                    errors.nofavouritesfound = 'No favourites found';
                    res.status(404).json(errors);
                });
        });
    }
);

// @route   GET api/favourites/:id
// @desc    Get a specific favourite by id
// @access  Private
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Favourite.get({ id: req.params.id })
            .then(favourite => res.json(favourite))
            .catch(err => {
                errors.nofavouritesfound = 'No favourite with that id found';
                res.status(404).json(errors);
            });
    }
);

// @route   POST api/favourites/:album_id/:track_id
// @desc    Add a new favourite track for a user
// @access  Private
router.post(
    '/:album_id/:track_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        User.get({ id: req.user.id }).then(user => {
            const newFavourite = new Favourite({
                id: shortid.generate(),
                albumId: req.params.album_id,
                trackId: req.params.track_id,
                userId: user.id
            });

            newFavourite
                .save()
                .then(fave => res.json(fave))
                .catch(err => {
                    errors.internal = 'Internal server error';
                    res.status(400).json(errors);
                });
        });
    }
);

// @route   DELETE api/favourites/:id
// @desc    Delete favourite track for a user
// @access  Private
router.post(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        User.get({ id: req.user.id }).then(user => {
            Favourite.get({ id: req.params.id })
                .then(favourite => {
                    if (favourite.userId.toString() !== req.user.id) {
                        errors.notauthorized = 'User not authorized';
                        return res.statusMessage(401).json(errors);
                    }

                    favourite
                        .delete()
                        .then(() => res.json({ success: true }))
                        .catch(err => {
                            errors.internal = 'Internal server error';
                            res.status(400).json(errors);
                        });
                })
                .catch(err => {
                    errors.nofavouritesfound =
                        'No favourite with that id found for this user.';
                    return res.status(404).json(errors);
                });
        });
    }
);

module.exports = router;
