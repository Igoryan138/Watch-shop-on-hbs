const checkIsSession = (req, res, next) => {
  if (req.session.adminId) {
    res.redirect('/admin');
  } else {
    next();
  }
};

module.exports = checkIsSession;
