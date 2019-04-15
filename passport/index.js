const passport = require('passport');

require('./serializers');
require('./localStrategy');

// USE passport.initialize() and passport.session() HERE:
module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}
