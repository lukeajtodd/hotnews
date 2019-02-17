const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dynamoose = require('dynamoose');
const User = dynamoose.model('users');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

module.exports = passport => {
    passport.use(
        new JWTStrategy(options, (jwtPayload, done) => {
            User.get({ id: jwtPayload.id })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
