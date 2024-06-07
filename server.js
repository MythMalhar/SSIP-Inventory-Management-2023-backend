import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import planningOrderRoutes from "./routes/planningOrderRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import captchaRoutes from "./routes/captchaRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import cors from "cors";

db();
const app = express();

app.use(express.json());
app.use(express.static(path.resolve("build")));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/hello", (req, res) => {
  res.send({
    success: true,
    message: "Hello World this side! The API is working fine.",
  });
});
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/planningorder", planningOrderRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/captcha", captchaRoutes);
app.use("/api/plan", planRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
