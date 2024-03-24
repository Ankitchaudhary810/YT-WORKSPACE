import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import workspaceRouter from "./routes/workspace";

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

app.use("/api/v1", userRouter);
app.use("/api/v1", workspaceRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port ", process.env.PORT);
});
