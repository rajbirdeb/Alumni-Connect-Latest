const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the AlumniConnect API');
});

module.exports = router;
