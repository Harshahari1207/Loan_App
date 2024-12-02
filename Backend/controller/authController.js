const UserService = require("../service/userService");
const { login } = require("../service/authService");

class AuthController {
  async register(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      console.log(result);
      res.status(201).send({ message: "Registered", result });
    } catch (error) {
      res.status(501).send({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const result = await login(req.body);
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ error: error.message });
    }
  }
}

module.exports = new AuthController();
