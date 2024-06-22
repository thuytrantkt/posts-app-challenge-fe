import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../Layout/Layout";
import { Grid } from "@mui/material";

const Loading = () => {
  return (
    <Layout>
      <Grid container justifyContent="center" height="100vh">
        <CircularProgress size={80} />
      </Grid>
    </Layout>
  );
};

export default Loading;
