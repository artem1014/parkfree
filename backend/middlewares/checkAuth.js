const checkAuth = (req, res, next) => {
  console.log(">>>>>>>", req.session);
  if (!req.session.user) {
    // добавили вопросы, без вопросов не работало!
    return res.sendStatus(401);
  }
  return next();
};
module.exports = { checkAuth };
