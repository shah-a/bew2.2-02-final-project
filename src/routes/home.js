const router = require('express').Router();

// This is just here so the app has a home :)
router.get('/', (req, res) => {
  res.json({ message: 'As-Salaamu \'Alaykum :)' });
});

module.exports = router;
