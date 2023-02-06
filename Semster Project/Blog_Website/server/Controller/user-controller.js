// controller are those callback function which we use in API ....we separate the API url and callback function
// API URL -> called router
// API CALLBACK FUNCTION -> called Controller
//as the controller and router are connected that's why we export it and import it in the router file so that at specific url we call specific function...That;s is API
import { request, response } from "express";
import dotenv from "dotenv";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
import Token from "../model/token.js";

dotenv.config(); //dotenv is intialize by it
export const signupUser = async (req, res) => {
  try {
    // const user = req.body; //here req is the object
    // append some random words away before the password
    // const salt = await bcryptjs.genSalt(10);
    // const hashPassword = await bcryptjs.hash(pas, 10);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    }); //we validate the signup user and then store it in the database
    // const newUser= await.createUser(user);//we validate the signup user and then store it in the database
    // await newUser.save();//it is mongodb function which store the newUser data in it but it is async function that's why we put await with it and do our function async
    //after validation and string data in the database then we show our customer some response in the frontend...we sent status and message through response
    //200--->ok
    return res.status(201).json({
      success: true,
      msg: " user signup",
    });
  } catch (error) {
    //500-->internal error from backend
    return res.status(500).json({
      success: false,
      msg: "error while user signup",
    });
  }
};

export const loginUser = async (req, res) => {
  //if we want to check it then in the const user-> complete object came which is store in the database
  //find method return the complete object which we store in the user
  try {
    const { username, password } = req.body;
    const newUser = await User.findOne({ username });
    const isPasswordMatches = await newUser.comparePassword(password);
    console.log(newUser);
    if (!newUser) {
      return res.status(400).json({
        msg: "User name does not match",
      });

      //when we check the user name then we match the password, but in the database we store the password in the encrypted form which we compare them then we firstly decripted it then match it
    } //for this we use try catch to check it
    //we compare the password of login and already exist account in the database....
    if (isPasswordMatches) {
      //   //if it is match then by using JWT generate one access token and one refresh
      //   //we use jsonwebtoken for authentication
      const accessToken = jwt.sign(
        newUser.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      ); //As access token is expire,it is not permanent and its has time for expiry--genuine expiry time is 15mint after 15 mint we want to access it --for this we use refresh token to make request for access token
      //   //access token has secret key and body--access token generate by using of them
      //   //jwt sign method take 2 argument...1-body(in json format) 2-secret key
      const refreshToken = jwt.sign(
        newUser.toJSON(),
        process.env.REFRESH_SECRET_KEY
      ); //we need it because access token is not permanent and to request the access token after expiry time with the help of the refresh token ---we generate access token by helping of the refresh token

      const newToken = new Token({ token: refreshToken }); //store the refresh token
      await newToken.save(); //refresh token is saved in database
      //next time we hit the database to check wether refresh token exit in it
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isPasswordMatches,
      });
    } else {
      return res.status(400).json({
        msg: "Password does not match",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while user login the website!",
    });
  }
};
