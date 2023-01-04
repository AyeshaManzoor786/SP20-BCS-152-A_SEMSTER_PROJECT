import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
//url me ? k bad jo bi likha hota ha usy searchParams bolty hn
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constant/data";
const ButtonColor = styled(Button)`
  text-transform: none; //we override the css of the material ui because in button of mui the text is upper case while we use as we want that we override it
  height: 50px;
  background: DarkOrange;
  color: white;
  border-radius: 2px;
  margin: 10px;
  width: 90%;

  & > button {
    text-decoration: none;
  }
`;
const StyleTable = styled(Table)`
  border: 2px solid grey;
  box-shadow: 2px 1px 1px 2px rgb(0 0 0 / 0.4);
`;
const StyleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <StyleLink to={`/create?category=${category || ""}`}>
        <ButtonColor variant="contained">Create Blog</ButtonColor>
      </StyleLink>
      <StyleTable>
        <TableHead>
          <TableRow>
            <StyleLink to="/">
              <TableCell>All Categories</TableCell>
            </StyleLink>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyleLink to={`/?category= ${category.type}`}>
                  {category.type}
                </StyleLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyleTable>
    </>
  );
};

export default Category;
