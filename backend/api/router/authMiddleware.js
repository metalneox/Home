const jwt = require("jsonwebtoken");
const User = require("../models/User")

const HMAC_JWT_SECRET = process.env.HMAC_JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Token", token);
  try {
    const payload = jwt.verify(token, HMAC_JWT_SECRET);
    req.user = await User.findOne({
      where: {
        id: payload.id
      }
    });

    if (!req.user) throw new Error("User doesn't exist");
  } catch (e) {
    console.log(e)
    return res.sendStatus(403);
  }

  next();
};