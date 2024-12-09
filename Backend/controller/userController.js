const UserService = require("../service/userService");

class UserController{

    getAllUsers = async (req, res) => {
        try {
          const users = await UserService.getAllUsers();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      getAUser = async (req, res) => {
        try {
          const user = await UserService.getAUser(req.params.id);
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
}

module.exports = new UserController();