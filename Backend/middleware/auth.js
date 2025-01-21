const passport = require("passport");
const User = require("../model/user");
const Admin = require("../model/admin");
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");

const SECRET_KEY = "secretPass";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async(payload, done) => {
    try {
        console.log(payload);
        let user;
        if(payload.role == "user"){
            user = await User.findById(payload.sub);
        }
        if(payload.role == "admin"){
            user = await Admin.findById(payload.sub);
        }
        if(user){
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

const auth = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = {auth, jwtStrategy};