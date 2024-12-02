const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Invalid email format",
    },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    type: String,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
  },
});

userSchema.methods.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  console.log("soanksnn son slndlk kdn kns", password, user.password);
  return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", userSchema);
