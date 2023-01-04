//routes is the end point of API
//www.facebook.com/user -----facebook.com is the API's URL(it always remain same) where /user is the end point( it is vary)
// router are present in express that's why firstly we import it
//we do to keep our code neat and clean
import express from "express";
import { signupUser, loginUser } from "../Controller/user-controller.js";
import { uploadImage } from "../Controller/ImageController.js";
//we need middleware to convert file into binary and upload it into MongoDB---we check type, authentication,name etc things of the image
import upload from "../utils/upload.js";
import { createPost } from "../Controller/post-controller.js";
import { authenticateToken } from "../Controller/jwtController.js";
const router = express.Router();

//call the api which we make it already
router.post("/signup", signupUser); //it take 2 parameter ---1. route(url)  2. callback function(controller's function)
router.post("/login", loginUser); //it take 2 parameter ---1. route(url)  2. callback function(controller's function)
router.post("/file/upload", upload.single("file"), uploadImage); //actually it take 3 parameter ---1. route(url) 2.middleware 3. callback function(controller's function)

router.post("/create", authenticateToken, createPost); //actually it take 3 parameter ---1. route(url) 2.middleware 3. callback function(controller's function)

export default router;
