const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('@validation/register');
const validateLoginInput = require('@validation/login');

const User = require('@models/User');

// @route   POST api/auth/register
// @desc    Register (create) a new user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, valid } = validateRegisterInput(req.body);

    if (!valid) {
        return res.status(400).json(errors);
    }

    let { name, email, password } = req.body;

    User.queryOne('email')
        .eq(email)
        .exec()
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                let newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route   POST api/auth/login
// @desc    Login user / Return JWT
// @access  Public
router.post('/login', (req, res) => {
    const { errors, valid } = validateLoginInput(req.body);

    if (!valid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    User.queryOne('email')
        .eq(email)
        .exec()
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        process.env.JWT_KEY,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    );
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;
