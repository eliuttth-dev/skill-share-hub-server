const { checkUserExists } = require("../models/user.model.js");
const { createUser } = require("../models/user.model.js");

async function registerUser(req, res){
  const { username, email, hashedPassword, bio, profile_pic_url } = req.body;

  try{
    const userExists = await checkUserExists(username, email);

    if(userExists) return res.status(400).json({message: "Username or email already exists"});  

    await createUser(username, email, hashedPassword, bio, profile_pic_url);

    return res.status(201).json({message: "User registered successfully."});
  }catch(error){
    console.error("Something went wrong: CONTROLLER << registerUser Func >> ", error.message);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
}

module.exports = registerUser;
