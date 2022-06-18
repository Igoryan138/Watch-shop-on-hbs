const router = require('express').Router();
// const bcrypt = require('bcrypt');

const { Admin } = require('../db/models');
const checkIsSession = require('../middlewares/checkIsSession');

router
  .route('/login')
  .all(checkIsSession)
  .get((req, res) => {
    res.render('all/login');
  })
  .post(async (req, res) => {
    const { password } = req.body;
    try {
      const adminLog = await Admin.findOne({
        where: {
          password,
        },
      });
      const isValidPass = password;
      if (isValidPass !== adminLog.password) {
        throw Error('no such password');
      }
      req.session.adminId = adminLog.id;

      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.redirect('/admin');
    }
  });

module.exports = router;
