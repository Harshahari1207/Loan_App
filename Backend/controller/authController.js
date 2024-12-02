const UserService = require("../service/userService");
const httpStatus = require("http-status");

class AuthController {
  async register(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      console.log(result);
      res.status(201).send({ message: "Registered", result });
    } catch (error) {
      res
        .status(501)
        .send({ error: error.message });
    }
  }

  login(req, res) {
    res.send("Login");
  }
}

module.exports = new AuthController();
