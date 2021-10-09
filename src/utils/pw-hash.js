const bcrypt = require('bcryptjs');

/*
 * NOTES:
 * The pwCheck function is simple enough that it would've been fine
 * to leave it in models/user.js. The reason I chose to put it in
 * here alongside pwHash is so that the hashing and checking  methods
 * can easily be seen, understood, modified, etc.. from the same place.
 */

function pwHash(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(this.password, salt))
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => {
        throw err;
      });
  }
}

function pwCheck(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = {
  pwHash, pwCheck
};
