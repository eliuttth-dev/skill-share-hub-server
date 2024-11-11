require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");


const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
