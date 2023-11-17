import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
connectDB();

app.use("/api/user/", userRouter);
app.use("/api/todo/", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to task tracker server");
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
