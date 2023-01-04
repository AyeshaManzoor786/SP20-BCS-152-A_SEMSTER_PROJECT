//As we want to store our data ---like our blog initial info ----we use state here
import { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add, ReplySharp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../contextAPI/dataProvider";
import { API } from "../../services/api.js";
//css

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const BoxStyle = styled(Box)`
  margin: 100px 100px;
`;

const ButtonColor = styled(Button)`
  text-transform: none; //we override the css of the material ui because in button of mui the text is upper case while we use as we want that we override it
  height: 50px;
  background: DarkOrange;
  color: white;
  border-radius: 2px;
`;

const StyleFormControl = styled(FormControl)`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 50px;
  font-size: 30px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 30px;
  border: 2px solid grey;
  box-shadow: 2px 1px 1px 2px rgb(0 0 0 / 0.4);
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(), // it is used to show your current date
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = useContext(DataContext);

  const ImageUrl = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  //useEffect hook take 2 parameter---> 1-Callback function 2-when callback function is called
  //This useEffect is call always when we change the image in uploading time that's why we update the state of it in 2nd parameter
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        // we draw the image info is here!
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //API CALL
        const response = await API.uploadFile(data);
        //when we upload the picture then we get the URL from MongoDB---we put the url in the object post k ander picture ki filed me
        post.picture = response.data;
      }
    };

    getImage();

    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value }); //we use it to call the API and hit the API,we hit the API through login button
  };

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <BoxStyle>
      <Image src={ImageUrl} alt="BannerImage" />
      <StyleFormControl>
        <label htmlFor="fileInput">
          {/* we pass fontSize and color as a props */}
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])} //we put the image in state and then we use this image to show in our blog
        />

        <InputTextField
          placeholder="Enter the title"
          // style={{ flex: "1", margin: "0 50px", fontSize: "30px" }}
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <ButtonColor variant="contained" onClick={() => savePost()}>
          Publish
        </ButtonColor>
      </StyleFormControl>

      <TextArea
        minRows={20}
        placeholder="Enter your Blog here!"
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </BoxStyle>
  );
};

export default CreatePost;
