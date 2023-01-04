//Work of Middleware= to do anything before API call

//with the help of multer-gridfs-storage middleware to upload the files/images  on MongoDB
//multer--handle the form-data
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config(); //we initialize the env file

// we make the object of gridfsStorage here--it treated as a function but take the object as a argument in it
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/blog",
  //   options: { useNewUrlParser: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"]; //only this type of images are allowed
    //memeType--check the extension of the file
    if (match.indexOf(file.memeType === -1)) {
      //if the extension type is not match in the array list
      return `${Date.now()}-blog-${file.originalname}`; //duplicate file name is not allowed
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});
export default multer({ storage });
