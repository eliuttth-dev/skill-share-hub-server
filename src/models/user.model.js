const mysql = require("mysql2/promise");
const dbConfig = require("../db/dbConfig.js");

const pool = mysql.createPool(dbConfig);

async function getConnection(){
  try{
    return await pool.getConnection();
  }catch(error){
    console.error("Error getting database connection: ", error.message);
    throw error;
  }
}

async function executableQuery(connection, query, params){
  try{
    const [rows] = await connection.execute(query, params);
    return rows;
  }catch(error){
    console.error("Error executing query: ", error.message);
    throw error;
  }
}

function releaseConnection(connection){
  if(connection) connection.release();
}

async function checkUserExists(username, email){

  const connection = await getConnection();
  
  try{
    const query = "SELECT * FROM Users WHERE username = ? OR email = ?";
    const values = [username, email];
    const rows = await executableQuery(connection, query, values);

    return rows && rows.length > 0; // Return true if user exists
  }finally{
    releaseConnection(connection);
  }
}

async function createUser(username, email, hashedPassword, bio = 'no bio yet', profile_pic_url = ""){
  const connection = await getConnection();

  try{
    const query = "INSERT INTO Users(username, email, password_hash, bio, profile_pic_url) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, hashedPassword, bio, profile_pic_url];
    
    await executableQuery(connection, query, values);
  }finally{
    releaseConnection(connection);
  }
}



module.exports = {
  checkUserExists,
  createUser
}
