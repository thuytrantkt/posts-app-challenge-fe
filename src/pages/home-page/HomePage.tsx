import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Typography component="h2" variant="h2" fontSize="6" textAlign="center">
        Welcome to the page!
      </Typography>

      <Link to="/posts">
        <Typography textAlign="center">Go to my posts page</Typography>
      </Link>
    </>
  );
};

export default HomePage;
