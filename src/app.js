require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.use(router);
app.get("/", (req,res) => {
   res.send("Hello World") 
});

app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
