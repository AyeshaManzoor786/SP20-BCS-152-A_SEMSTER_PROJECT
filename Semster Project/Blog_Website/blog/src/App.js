// import logo from './logo.svg';
import "./App.css";
import DataProvider from "./contextAPI/dataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
// We import all the component in app.js which we use in our website...we do not give extension here because it is all given by default

import Login from "./component/account/Login";
import Home from "./component/Home/Home";
import Header from "./component/Header/header";
import CreatePost from "./component/CreateBlog/createPost.jsx";
//in react we pass the data in 2 ways in component
//1->props
//2->children(opening and closing tag k under kuxh bi likha ho wo children hota ha)

//we make PivateRoute to check the login user is authenticated or not--if he is authenticated then we give access him the remaining component
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      {/* outlet mean if user is authenticated then it goes to children of the privateRoute which is Home page and other components (pages) */}
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  ); //if person is not authenticated then we navigate it to login screen
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      {/* it is single page web application --we navigate the different pages through url base routing--url change and the component change */}
      <BrowserRouter>
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />} //we pass isUserAuthenticated as a props....
            />

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
