const User = require("../model/user");

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  console.log(user, await user.isPasswordMatch(data.password));
  if (!user || !(await user.isPasswordMatch(data.password))) {
    throw new Error("Invalid email or password");
  }
  return user;
};

module.exports = { login };
