const mysql = require("mysql2/promise");
const dbConfig = require("../db/dbConfig.js");

const pool = mysql.createPool(dbConfig);

async function checkUserExists(username, email){

  const connection = await pool.getConnection();
  
  try{
    const query = "SELECT * FROM Users WHERE username = ? OR email = ?";
    const values = [username, email];
    const [rows] = await connection.execute(query,values);

    return rows.length > 0; // Return true if user exists
  }catch(error){
    console.error("Something went wrong: USER MODEL << checkUserExists Func >> ", error.message);
  }finally{
    connection.release();
  }
}

async function createUser(username, email, hashedPassword, bio, profile_pic_url){
  const connection = await pool.getConnection();

  try{
    const query = "INSERT INTO Users(username, email, password_hash, bio, profile_pic_url) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, hashedPassword, bio, profile_pic_url];
    
    await connection.execute(query, values);
  }catch(error){
    console.error("Something went wrong: USER MODEL << createUser Func >> ", error.message);
  }finally{
    connection.release();
  }
}



module.exports = {
  checkUserExists,
  createUser
}
