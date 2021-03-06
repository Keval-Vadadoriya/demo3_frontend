import React from "react";
import { Box, Typography } from "@mui/material";

function Unauthorized() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "91.5vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(209, 209, 209)",
        }}
      >
        <Typography
          variant="h1"
          component="span"
          gutterBottom
          color="rgb(104, 104, 104)"
          marginLeft="10px"
        >
          Unauthorized Access
        </Typography>
      </Box>
    </>
  );
}

export default Unauthorized;
