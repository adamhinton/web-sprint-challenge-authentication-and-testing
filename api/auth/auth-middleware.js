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

function checkUserPassExist(req, res, next) {
  if (!req.body.password || !req.body.username) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
}

module.exports = {
  checkUsernameFree,
  checkUserPassExist,
};
