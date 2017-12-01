const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const client =require('./redis');
require('dotenv').config();
//const Model = require('./sequelize');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null,{profile:profile,accessToken:accessToken});
      }
    ));

    passport.serializeUser((user, done) => {
        client.setex(user.accessToken,6500,user.profile.displayName,(err,data)=>{
            if(err){return console.log(err)};
            client.get(user.accessToken,(err,data)=>{
                if(err){return console.log(err);}
                console.log('The login person is ',data);
            });
        });    
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null,user);
    });
};
