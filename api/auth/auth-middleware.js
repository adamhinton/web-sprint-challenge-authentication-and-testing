const User = require("../users/users-model");

async function checkUsernameFree(req, res, next) {
  try {
    const [user] = await User.findBy({ username: req.body.username });
    console.log(user);
    if (!user) next();
    else {
      console.log("blah blah blah");
      res.status(422).json({ message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const [user] = await User.findBy({ username: req.body.username });
    if (user) {
      req.user = user;
      next();
    } else next({ message: "Invalid credentials", status: 401 });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkUsernameFree,
  checkUsernameExists,
};
