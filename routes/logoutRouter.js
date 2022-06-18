const router = require('express').Router();

const checkIsNotSession = require('../middlewares/checkIsNotSession');

router.get('/', checkIsNotSession, (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.COOKIE_NAME);
  res.redirect('/');
});

module.exports = router;
