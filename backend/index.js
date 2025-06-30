import dotenv from "dotenv"
import express from "express";
import cors from "cors"
import connectDB from "./db/index.js"
import user from "./routes/user.routes.js"




dotenv.config({
  path: "./env",
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", user)


connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at port !!! ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed: ", error);
  });



