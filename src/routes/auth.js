const router = require('express').Router();
const { requireUnauth } = require('../middleware');
const { auth } = require('../controllers');

// GET routes
router.get('/logout', auth.getLogout);

// POST routes
router.post('/login', requireUnauth, auth.postLogin);

module.exports = router;
