import mongoose from "mongoose";
export default () => {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
    console.log("MONGODB Connected successfully...");
  });
  connection.on("error", () => {
    console.log("Fails to connect....");
  });
};
