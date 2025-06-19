import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import FileUpload from "express-fileupload";
import RegisterRoute from "./routes/RegisterRoute.js";
import PegawaiRoute from "./routes/PegawaiRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(RegisterRoute);
app.use(PegawaiRoute);

app.listen(process.env.APP_PORT, () => {
    console.log("Server upp and running on port " + process.env.APP_PORT);
});