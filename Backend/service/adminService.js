const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
class AdminService{
    createAdmin = async(data) => {
        
        const hashPassword = await bcrypt.hash(data.password, 10);
        const res = { ...data, password: hashPassword };
        const admin = await Admin.create(res);
        return admin
    }
}

module.exports = new AdminService();