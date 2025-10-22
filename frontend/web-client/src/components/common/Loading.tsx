import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="inherit" size="3rem" />
    </Box>
  );
}
