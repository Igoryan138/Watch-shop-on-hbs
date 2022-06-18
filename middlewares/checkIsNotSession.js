const checkIsNotSession = (req, res, next) => {
  if (!req.session.adminId) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = checkIsNotSession;
