import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// import appRoutes from "./app/routes/appRoutes.js";

import env from "dotenv";
env.config();

cors("*");

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
// app.use("/api", appRoutes);

app.listen(PORT, () =>
  console.log(`App started on PORT ${PORT} as ${new Date().toUTCString()}`)
);
