const User = require("../model/user");
const Admin = require("../model/admin");

class AuthService{
  login = async (data) => {
    const user = await User.findOne({ email: data.email });
    console.log(user, await user.isPasswordMatch(data.password));
    if (!user || !(await user.isPasswordMatch(data.password))) {
      throw new Error("Invalid email or password");
    }
    
    return user;
  };

  adminLogin = async (data) => {
    console.log(data.email)
    const admin = await Admin.findOne({ email: data.email });
    // console.log(admin);
    if (!admin || !(await admin.isPasswordMatch(data.password))) {
      throw new Error("Invalid email or password");
    }
    return admin;
  }
  
}


module.exports = new AuthService() ;
