import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom"; //we want to show all the typography(text) as a routing component
//so that we navigate different routing URL with the help of only by click it

//for styling
const Component = styled(AppBar)`
  background: black;
`;
const Tool = styled(Toolbar)`
  justify-content: none;
  & > a {
    padding: 10px;
    color: inherit;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <>
      <Component>
        <Tool>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/logout">LogOut</Link>
        </Tool>
      </Component>
    </>
  );
};

export default Header;
