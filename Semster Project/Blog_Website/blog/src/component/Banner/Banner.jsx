//as we make the banner in the home page that's why we import it in home page
import { Box, Typography, styled } from "@mui/material";

//Styling and CSS
const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/60% repeat-x white;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled(Typography)`
  color: white;
  font-size: 80px;
  font-width: 400;
  line-height: 2;
`;

const SubHeading = styled(Typography)`
  color: black;
  font-size: 20px;
  font-width: 400;
  line-height: 1;
  background: white;
  margin-bottom: 5px;
`;
const SubHeading2 = styled(Typography)`
  color: black;
  font-size: 20px;
  font-width: 400;
  line-height: 1;
  background: white;
`;
const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>SP20-BCS-152(A)</SubHeading>
      <SubHeading2>AYESHA BIBI</SubHeading2>
    </Image>
  );
};

export default Banner;
