import express from "express";

const app = express();
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send({
    success: true,
    message: "Hello World",
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});