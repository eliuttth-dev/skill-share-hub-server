const crypto = require("crypto");

const { REQUIRED_FIELDS, DEFAULT_BIO, DEFAULT_PROFILE_PIC_URL } = require("../config/constants.js");

function validateRequiredFields({username, email, password}){
  if(!username || !email || !password) return { valid: false, message: "Username, email and password are requried" };
  
  return { valid: true };
}

function hashPassword(password){
  const hash = crypto.createHash("sha256");
  return hash.update(password).digest("hex");
}

function registerMiddleware(req, res, next){
  const { username, email, password, bio, profile_pic_url } = req.body;

  const validation = validateRequiredFields({username, email, password});
  
  if(!validation.valid) return res.status(400).json({ message: validation.message })

  req.body.hashedPassword = hashPassword(password);
  req.body.bio = bio || DEFAULT_BIO;
  req.body.profile_pic_url = profile_pic_url || DEFAULT_PROFILE_PIC_URL;

  next();
}

module.exports = registerMiddleware;
