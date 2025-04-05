import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import blogRoute from "./routes/blogs.js";
import servicesRoute from "./routes/services.js";
import hotelRoute from "./routes/hotel.js";
import cloudinary from "cloudinary";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// for testing
// app.get('/', (req, res) => {
//     res.send('API is working');
// });

// database connection
mongoose.set("strictQuery", false);
const conect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/services", servicesRoute);
app.use("/api/v1/hotels", hotelRoute);

app.listen(port, () => {
  conect();
  console.log(`Server is running on port ${port}`);
});
