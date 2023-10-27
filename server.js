import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/dbConfig.js";

const app = express();
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send({
    success: true,
    message: "Hello World",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
