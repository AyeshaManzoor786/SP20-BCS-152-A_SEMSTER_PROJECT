//import all the component which we want to show in the home page
//Component
import { Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import Category from "./Category";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Category />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          Posts
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
