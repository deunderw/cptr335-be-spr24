const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy (authUser))

authUser = (username, password, done) => {
    let authenticatedUser = {username: 'Mickey', password: 'Password'}

    return done (null, authenticatedUser)
}