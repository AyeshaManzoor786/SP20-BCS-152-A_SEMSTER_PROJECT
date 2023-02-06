import { Typography } from "@mui/material";
import React from "react";

function MuiTypo() {
  return (
    <div>
      {/* Typography with 6 tags of h1 */}
      <Typography variant="h1">Hello World</Typography>
      <Typography variant="h2">Hello World</Typography>
      <Typography variant="h3">Hello World</Typography>
      <Typography variant="h4">Hello World</Typography>
      <Typography variant="h5">Hello World</Typography>
      <Typography variant="h6">Hello World</Typography>

      {/* Typography with Inputs */}
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>

      {/* Typography with Input */}
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
        expedita recusandae eos voluptatibus fuga. Esse, rem. Architecto fugit
        mollitia, nihil blanditiis sed, aperiam qui minima, obcaecati dolor
        dolorum esse saepe!
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
        quibusdam, recusandae atque dolore, deleniti optio corporis minima
        voluptates, molestiae ex officiis? Adipisci sunt commodi est eius
        quisquam voluptatem ducimus vel!
      </Typography>
    </div>
  );
}

export default MuiTypo;
