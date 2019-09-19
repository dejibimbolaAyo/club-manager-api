const User = require("../../services/userService");

const passport    = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require('passport-jwt');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey   : process.env.JWT_SECRET,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        // find user
        const user =  await User.findByEmail(payload.sub);
        console.log("User in passport", user)
        // if user does not exist
        if (!user.status) {
            return done(null, false)
        }
        // if user exists
        done(null, user.data)

    } catch (error) {
        done(error, false)
    }
}
));