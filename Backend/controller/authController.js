const UserService = require("../service/userService");
const AuthService = require("../service/authService");
const AdminService = require("../service/adminService");

const TokenService = require("../service/tokenService");
class AuthController {
  register = async(req, res) => {
    try {
      console.log(req.body, "inside controller");
      const result = await UserService.createUser(req.body);
      console.log(result, "inside contorller");
      const tokens = await TokenService.generateAuthTokens(result);
      console.log(tokens, "inside controller");
      res.status(201).send({ message: "Registration successful", result, tokens });
    } catch (error) {
      console.log(error);
      res.status(501).send({ error: error.message });
    }
  }

  login = async(req, res) =>{
    try {
      const result = await AuthService.login(req.body);
      console.log(result);
      const tokens = await TokenService.generateAuthTokens(result);
      res.status(200).send({ message: "Login successful", result, tokens });
    } catch (error) {
      res.status(501).send({ error: error.message });
    }
  }

  adminRegister = async(req, res) => {  
    try {
      const result = await AdminService.createAdmin(req.body);
      console.log(result, "inside contorller");
      const tokens = await TokenService.generateAuthTokens(result);
      console.log(tokens, "inside controller");
      res.status(201).send({ message: "Admin Registration successful", result, tokens });
    } catch (error) {
        res.status(501).send({ error: error.message });
    }
}

  adminLogin = async(req, res) => {
    try{
      const result = await AuthService.adminLogin(req.body);
      const tokens = await TokenService.generateAuthTokens(result);
      res.status(200).send({ message: "Admin Login successful", result, tokens });
    }catch(error){
      res.status(501).send({ error: error.message });
    }
}
}

module.exports = new AuthController();
