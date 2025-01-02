import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import pg from "pg";

const app = express();
const port = 3000;

const corsOptions = { origin: "*" };
app.use(cors(corsOptions));



app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});