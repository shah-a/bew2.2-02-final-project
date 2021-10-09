const router = require('express').Router();
const { users } = require('../controllers');
const { requireAuth } = require('../middleware');

/*
 * NOTES:
 * > The `getAll` controller's route is intended to be an
 *   open-access route (i.e. no auth required).
 * > It's important NOT to apply the requireAuth middleware to
 *   the `postOne` controller's route. Otherwise, the user will
 *   need to be authenticated before they can make an account.
 *   Do you see the problem with that? 😆
 */

// GET routes
router.get('/', users.getAll);
router.get('/:username', requireAuth, users.getOne);

// POST routes
router.post('/', users.postOne);

// PUT routes
router.put('/:username', requireAuth, users.putOne);

// DELETE routes
router.delete('/:username', requireAuth, users.deleteOne);

module.exports = router;
