const Joi = require("joi");

class UserValidation {
  password(value, helpers) {
    if (value.length < 8) {
      return helpers.message("password must be at least 8 characters");
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message(
        "password must contain at least 1 letter and 1 number"
      );
    }
    return value;
  }
  register() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().custom(this.password).required(),
    });
  }
  login() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().custom(this.password).required(),
    });
  }
}

module.exports = new UserValidation();
