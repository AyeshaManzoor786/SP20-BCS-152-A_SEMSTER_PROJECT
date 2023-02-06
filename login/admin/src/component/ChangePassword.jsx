import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div sx={{ maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h3">Login</Typography>
      <Typography variant="subtitle1">Change Password</Typography>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <form>
          <div>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              {...register("Password")}
              sx={{ width: "100%" }}
            />
            <TextField
              id="change-password"
              label="Change Password"
              type="password"
              variant="outlined"
              {...register("Change Password")}
              sx={{ width: "100%", marginTop: "20px" }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={handleSubmit(onSubmit)}
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
