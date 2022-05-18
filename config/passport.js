const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const JwtOption = {
  secretOrKey: process.env.JWT_SECRET_KEY || "undefineKey",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(JwtOption, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id } });

      if (!user) {
        done(new Error("user not found"), false);
      }

      if (payload.iat * 1000 < new Date(user.last_update_password).getTime()) {
        done(new Error("You are unauthorized"), false);
      }
      done(null, user); //    req.user = user;
    } catch (err) {
      done(err, false);
    }
  })
);
