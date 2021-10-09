const router = require('express').Router();
const { locations } = require('../controllers');
const { requireAuth } = require('../middleware');

// Authentication middleware applied to all endpoints
router.use('/', requireAuth);

// GET routes
router.get('/', locations.getAll);
router.get('/:locationId', locations.getOne);

// POST routes
router.post('/', locations.postOne);

// PUT routes
router.put('/:locationId', locations.putOne);

// DELETE routes
router.delete('/:locationId', locations.deleteOne);

module.exports = router;
