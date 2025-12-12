const express = require("express");
const app = express();

// //load config from env file
// require("dotenv").config();
// const PORT = process.env.PORT || 3000;

app.use(express.json());
const todoroutes=require('./Routers/Create');
app.use("/api/v1",todoroutes);

//connect to database

const dbConnect = require("./config/database");
dbConnect();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE baby</h1>`);
});