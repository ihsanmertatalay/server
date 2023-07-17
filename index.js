import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from './router/router.js'
import serverless from 'serverless-http'


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

app.use('/.netlify/functions/api', router);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to server"))
    .catch((err) => console.log(err));
});

module.exports = app;
module.exports.handler = serverless(app);