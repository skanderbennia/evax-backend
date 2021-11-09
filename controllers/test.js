const router = require('express').Router();

router.get('/', async (req, res) => {
  res.status(500).json({
    message: 'Hello from test for admin',
  });
});

module.exports = router;
