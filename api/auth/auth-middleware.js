const User = require("../users/users-model");

async function checkUsernameFree(req, res, next) {
  try {
    const [user] = await User.findBy({ username: req.body.username });
    if (!user) next();
    else {
      res.status(422).json({ message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
}

// async function checkUsernameExists(req, res, next) {
//   try {
//     const [user] = await User.findBy({ username: req.body.username });
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       res.status(401).json({ message: "username and password required" });
//     }
//   } catch (err) {
//     next(err);
//   }
// }

function checkUserPassExistInBody(req, res, next) {
  if (!req.body.password || !req.body.username) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
}

async function checkUsernameExistsInDB(req, res, next) {
  try {
    const [user] = await User.findBy({ username: req.body.username });
    if (user) {
      req.user = user;
      next();
    } else res.status(401).json({ message: "invalid credentials" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkUsernameFree,
  checkUserPassExistInBody,
  checkUsernameExistsInDB,
};
