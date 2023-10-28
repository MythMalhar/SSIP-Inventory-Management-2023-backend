import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";

db();
const app = express();

app.use(express.json());
app.get("/hello", (req, res) => {
  res.send({
    success: false,
    message: "Hello World this side! The API is working fine.",
  });
});
app.get("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
