const jwt = require("jsonwebtoken");

class TokenService {
  generateToken = (userId, expires, type, secret) => {
    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: expires,
      type,
    };

    return jwt.sign(payload, secret);
  };

  generateAuthTokens = async (user) => {
      console.log("inside tokenservice");
    const accessTokenExpires = Math.floor(Date.now() / 1000) + 60 * 150;
    const token = this.generateToken(
      user._id,
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
