const crypto = require("crypto");
const { REQUIRED_FIELDS } = require("../config/constants.js");  
const validateRequiredFields = require("../utils/validateFields.js");
const checkUser = require("../models/user.model.js");

// CHANGE THIS BECAUSE HASHED PASSWORD SHOULD BE TAKE FROM DB

const hashPassword = password => return crypto.createHash("sha256").update(password).digest("hex");

function compareHashedPassword(password, hashedPassword){
  if(hashPassword(password) === hashedPassword) return true;
}

async function loginMiddleware(req, res, next){
  const { username, password } = req.body;
  
  const hashedPassword = hashPassword(password);  

  const validation = validateRequiredFields(REQUIRED_FIELDS, "login");

  if(!validation.valid) return res.status(400).json({message: "Username and Password are required fields"}); 
  
  // check if user exists
  const existingUser = await checkUser(username);

  if(!existingUser) return res.status(404).json({message: "User does not exists"});
  
  const passwordMatch = compareHashedPassword(password, hashedPassword);

  if(!passwordMatch) return res.status(401).json({message: "Authentication failed"});

  next();
}

module.exports = loginMiddleware;
