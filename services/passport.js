const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    // This is not the google profile id
    // this is the id given by mongo _id
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {

        User.findOne({
                googleId: profile.id
            })
            .then((exisitingUser) => {
                if (exisitingUser) {
                    done(null, exisitingUser);
                } else {
                    let user = new User({
                        googleId: profile.id
                    });
                    user.save((err) => {
                        if (err) console.log("Error saving record", err);
                        else {
                            console.log("Created Record");
                            done(null, user);
                        }
                    });
                }
            })
    }
));

passport.use(new FacebookStrategy({
        clientID: config.fbclientID,
        clientSecret: config.fbClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({
            facebookId: profile.id
        })
        .then((exisitingUser) => {
            if (exisitingUser) {
                done(null, exisitingUser);
            } else {
                let user = new User({
                    facebookId: profile.id
                });
                user.save((err) => {
                    if (err) console.log("Error saving record", err);
                    else {
                        console.log("Created Record");
                        done(null, user);
                    }
                });
            }
        })
    }
));
