const UserValidation = require("../validation/userValidation");

const validateRegister = (req, res, next) => {
  const { error } = UserValidation.validate(req.body, "register");

  if (error) {
    console.log(error)
    return res.status(400).json({ error: error });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { error } = UserValidation.validate(req.body, "login");

  if (error) {
    return res.status(400).json({ error: error });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
