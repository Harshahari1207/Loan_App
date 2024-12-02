const User = require("../model/user");
const bcrypt = require("bcrypt");
class UserService {
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async createUser(user) {
    const { name, email, password } = user;
    const hashPassword = await this.encryptPassword(password);
    console.log(hashPassword);
    const res = { ...user, password: hashPassword };
    return await User.create(res);
  }
}

module.exports = new UserService();
