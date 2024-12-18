import express from "express";
import cors from "cors";
import RegisterRoute from "./routes/RegisterRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(RegisterRoute);

app.listen(5001, ()=> console.log('Server up and running...'));