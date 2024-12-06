const UserService = require("../service/userService");
const { login } = require("../service/authService");
const TokenService = require("../service/tokenService");
class AuthController {
  async register(req, res) {
    try {
      console.log(req.body, "inside controller");
      const result = await UserService.createUser(req.body);
      console.log(result, "inside contorller");
      const tokens = await TokenService.generateAuthTokens(result);
      console.log(tokens, "inside controller");
      res.status(201).send({ message: "Registration successful", result, tokens });
    } catch (error) {
      res.status(501).send({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const result = await login(req.body);
      console.log(result);
      const tokens = await TokenService.generateAuthTokens(result);
      res.status(200).send({ message: "Login successful", result, tokens });
    } catch (error) {
      res.status(501).send({ error: error.message });
    }
  }
}

module.exports = new AuthController();
