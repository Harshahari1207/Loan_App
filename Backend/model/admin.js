const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
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
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: true,
    },
  });   


  adminSchema.methods.isEmailTaken = async function (email) {
    const admin = await this.findOne({ email });
    return !!admin;
  };
  adminSchema.methods.isPasswordMatch = async function (password) {
    const admin = this;
    console.log("soanksnn son slndlk kdn kns", await bcrypt.compare(password, admin.password));
    return await bcrypt.compare(password, admin.password);
  };
module.exports = mongoose.model("Admin", adminSchema);