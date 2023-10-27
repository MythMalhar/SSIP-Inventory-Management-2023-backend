import mongoose, { connection } from "mongoose";
export default () => {
  mongoose.connect = process.env.MONGO_URL;
  const connction = mongoose.connection;
  connection.on("connected", () => {
    console.log("MONGODB Connected successfully...");
  });
  connection.on("error", () => {
    console.log("Failes to connect....");
  });
};
