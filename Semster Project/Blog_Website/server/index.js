import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "./routes/routes.js";
import cors from "cors";
// import user from "./model/user.js";
import bodyParser from "body-parser"; //jis request me body ati ha us me yah use hota ha lazmi
//-> we can import it directly in latest version but we also put the type in package.json file   // when we import express
// const express=require("express");
// const mongoose=require('mongoose');
// latest version of express cannot understand to handle the post api that's why use body-parser package to handle it

dotenv.config(); //initialize the env file
const app = express();
const PORT = 8000;
const HOSTNAME = "localhost";

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
//mongo DB connection
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("Connect to mongo DB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Create Server
app.listen(PORT, HOSTNAME, () => {
  console.log(
    `Server is running at hostname ${HOSTNAME} port ${PORT} successfully`
  );
});
