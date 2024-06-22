import React from "react";
import Layout from "../../components/Layout/Layout";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Layout>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h2"
            component="h2"
            fontWeight="bold"
            paddingBottom={4}
          >
            404
          </Typography>
          <Typography paddingBottom={2}>
            I'm afraid you've found a page that doesn't exist on CodePen. That
            can happen when you follow a link to something that has since been
            deleted. Or the link was incorrect to begin with. Sorry about that.
            We've logged the error for review, in case it's our fault.
          </Typography>
          <Link to="/posts">Go to Home Page</Link>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default NotFoundPage;
