const jwt = require("jsonwebtoken");

class TokenService {
  generateToken = (userId, role, expires, type, secret) => {
    const payload = {
      sub: userId,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: expires,
      type,
    };

    return jwt.sign(payload, secret);
  };

  generateAuthTokens = async (user, role) => {
      console.log("inside tokenservice");
    const accessTokenExpires = Math.floor(Date.now() / 1000) + 60 * 150;
    const token = this.generateToken(
      user._id,
      role,
      accessTokenExpires,
      "access",
      "secretPass"
    );
    return {
      access: {
        token: token,
        expires: new Date(accessTokenExpires * 1000),
      },
    };
  };
}

module.exports = new TokenService();
