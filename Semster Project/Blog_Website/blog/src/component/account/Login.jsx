// we need to export the component which we build in it
// import React from 'react';
// material UI is the react frame where the building components are already placed.we just import and use them in our website
// we can also use the css from material UI--if we want to change it then we override the css with our custom css
import { Box, TextField, Button, styled, Typography } from "@mui/material"; // in mui, div is replaced by box
import { useState, useContext } from "react";
import { API } from "../../services/api";
import { DataContext } from "../../contextAPI/dataProvider";
import { useNavigate } from "react-router-dom";
// Method of the material UI CSS -----
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  border: 2px solid grey;
  box-shadow: 2px 1px 1px 2px rgb(0 0 0 / 0.4);
`;

const Wrapper = styled(Box)`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  // we apply the css on the child element through &>(yaha pr us child element ka original tag aya ga qk hum material ui me name change hoty ha na is liya)
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none; //we override the css of the material ui because in button of mui the text is upper case while we use as we want that we override it
  height: 50px;
  background: DarkOrange;
  color: white;
  border-radius: 2px;
`;
const SignButton = styled(Button)`
  text-transform: none; //we override the css of the material ui because in button of mui the text is upper case while we use as we want that we override it
  height: 50px;
  background: white;
  color: DarkOrange;
  border-radius: 2px;
  box-shadow: 0 5px 8px 0 rgb(0 0 0/0.5);
`;
const Error = styled(Typography)`
  font-size: 10px;
  line-height: 0;
  color: red;
  margin-top: 10px;
  font-weight: 600px;
`;
const Text = styled(Typography)`
  color: DarkGrey;
  font-size: 14px;
`;
// const Image=styled(img)-->this will create an error because it is html tag-> we not import it from material UI->>It is treated like a variable
// So,if we want to change the css of html tag then we make it string ('img') otherwise it consider it as a variable and for it we write the css in json format ->({margin:2,...})->we add the object in paranthesis()
// when we write the css in object then always write it in Camel Case not hyphen case---BackgroundColor etc...
const Image = styled("img")({
  width: 80,
  margin: "auto", //it is not work until we add display:flex--we write the auto in string
  display: "flex",
  padding: "10px 0",
});
//to store the object we use useState
const signupInitialValue = {
  firstName: "",
  lastName: "",
  password: "",
};
//to pass the object we,use in useState
const loginInitialValue = {
  username: "",
  password: "",
};
const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login"); //[account]->it is static variable we cannot change them that's why we use the setAccount to change its state
  const [signup, setSignUp] = useState(signupInitialValue); //[signup]->it is static variable we cannot change them that's why we use the setSignUpto change its state
  const [login, setLogin] = useState(loginInitialValue); //to store the value of the user in the form of object,we put the value of login through setLogin into Login
  const [error, setError] = useState("");
  const { setAccount } = useContext(DataContext); //we pass the value of the login user from dataProvider--contextAPI
  const navigate = useNavigate(); //custom hook

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup"); //it check if we are on signup page then on click we go to login page otherwise still remain same of signup page
  };
  //sign up user--to call  the API---we make the API in config and just add the object for that API
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignUp(signupInitialValue);
      toggleAccount("login");
    } else {
      setError("something went wrong! please try again later");
    }
  };
  //login user--to call the API---we make the API in config and just add the object for that API
  // we can handle it as a control component(where you can handle your value by myself)-for this we add value={login.username}->where login is state variable and username is the key
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      ); //store the access token
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      ); //store the refresh token
      // firstName---we can extract these values from contextApI file
      // lastName
      setAccount({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
      isUserAuthenticated(true); //if the person is already login
      navigate("/"); //when user successfully login then it navigate to the Home page
    } else {
      setError("something went wrong! please try again later");
    }
  };
  const OnInputChange = (e) => {
    console.log(e.target.name, e.target.value); //to store the values which we get from it , we need a dummy object and then change it state but with previous value-> for it we use spread operator
    setSignUp({ ...signup, [e.target.name]: e.target.value }); //if we not use the spread operator, then it will override the values while we need previous values then we use spread operator
    //[e.target.name]-> will work as the key and e.target.value will work as value in object
  };

  const OnValueChange = (e) => {
    console.log(e.target.name, e.target.value);
    setLogin({ ...login, [e.target.name]: e.target.value }); //we use it to call the API and hit the API,we hit the API through login button
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="loginImage" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Name"
              value={login.username}
              variant="standard"
              onChange={(e) => OnValueChange(e)}
              name="username"
            />
            <TextField
              id="standard-basic"
              label="Password"
              value={login.password}
              variant="standard"
              onChange={(e) => OnValueChange(e)}
              name="password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignButton variant="text" onClick={() => toggleSignup()}>
              Sign Up
            </SignButton>
          </Wrapper>
        ) : (
          <Wrapper>
            {/* to save the value of the field , we need a variable which is in this case name=''  */}
            <TextField
              id="standard-basic"
              label="FirstName"
              variant="standard"
              onChange={(e) => OnInputChange(e)}
              name="firstName"
            />
            <TextField
              id="standard-basic"
              label="LastName"
              variant="standard"
              onChange={(e) => OnInputChange(e)}
              name="lastName"
            />
            {/* <TextField id="standard-basic" label="email" variant="standard" onChange={(e)=>OnInputChange(e)}name='email'/> */}
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => OnInputChange(e)}
              name="password"
            />
            {error && <Error>{error}</Error>}
            <SignButton variant="text" onClick={() => signupUser()}>
              Sign Up
            </SignButton>
            {/* onClick function->we call API through signupUser */}

            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup}>
              You have Already Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
