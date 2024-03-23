import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user";

const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.get("/me", (req, res) => {
  res.send("hi");
});

app.use("/api/v1", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port ", process.env.PORT);
});
