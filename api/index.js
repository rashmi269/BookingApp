import  express  from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();



const connect = async () => {
  try {
  await mongoose.connect(process.env.MONGO);
  console.log("Database is Running");
  } catch (error) {
  console.log("Error while connecting with DB");
  console.log(error);
  }
  };

  mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected")
  });

  app.use(cors())
  app.use(cookieParser())
  //By default you cant send any json object to express server
  app.use(express.json())
  app.use("/api/auth", authRoute);
  app.use("/api/hotels",hotelsRoute);
  app.use("/api/rooms", roomsRoute);
  app.use("/api/user", userRoute);

  app.use((err, req, res, next) => {
     const errorStatus = err.status || 500
     const errorMsg= err.message || "Something went wrong"
     return res.status(errorStatus).json({
      success : false,
      status: errorStatus,
      message: errorMsg,
      stack : err.stack,
     });
  });

  app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
  });