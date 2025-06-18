const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  const users = [ /* your data */ ];
  res.json(users);
});

module.exports = router;
