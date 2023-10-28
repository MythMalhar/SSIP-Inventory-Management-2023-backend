import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

db();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/hello", (req, res) => {
  res.send({
    success: true,
    message: "Hello World this side! The API is working fine.",
  });
});
app.get("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
