function validateRequiredFields(fields, operation){

  const [username, email, password] = fields;

  if(operation === "register"){
    if(!username || !email || !password) return { valid: false, message: "Username, email and password are requried" };
  }
  
  if(operation === "login"){
    if(!username) return { valid: false, message: "Username is required" };
    if(!password) return { valid: false, message: "Password is required" };
  }

  return { valid: true};
}

module.exports = validateRequiredFields;
