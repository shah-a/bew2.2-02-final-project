const jwt = require('jsonwebtoken');
const ms = require('ms');
const { User } = require('../models');

const getLogout = (req, res) => {
  res
    .clearCookie('nToken')
    .json({ message: 'Successfully logged out.' });
};

const postLogin = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  let user;

  User.findOne({ username }).select(['username', 'password'])
    .then((query) => {
      user = query;
      if (user) return user.pwCheck(password);
      throw new Error('User is not signed up.');
    })
    .then((match) => {
      if (match) {
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          process.env.SECRET,
          { expiresIn: '1 hour' }
        );
        return res
          .cookie('nToken', token, { maxAge: ms('1 hour'), httpOnly: true })
          .json({ message: `Successfully authenticated. As-Salaamu 'Alaykum, '${username}' :)` });
      }
      return res.status(401).json({ message: 'Incorrect password.' });
    })
    .catch((err) => {
      if (err.message === 'User is not signed up.') {
        return res
          .status(404)
          .json({ message: `User '${username}' is not signed up.` });
      }
      return res.json({ error: err.message });
    });
};

module.exports = {
  getLogout,
  postLogin
};
