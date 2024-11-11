const crypto = require("crypto");

function registerMiddleware(req, res, next){
  const { username, email, password, bio, profile_pic_url } = req.body;

  if(!username || !email || !password) return res.status(400).json({message: "Username, email and password are required"});
  
  const hashPassword = crypto.createHash("sha256");
  const hashedPassword = hashPassword.update(password).digest("hex");

  req.body.hashedPassword = hashedPassword;
  req.body.bio = bio || "no bio yet";
  req.body.profile_pic_url = profile_pic_url || "";

  next();
}

module.exports = registerMiddleware;
