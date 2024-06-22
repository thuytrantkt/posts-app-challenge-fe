import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingY: 8 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            height: "100vh",
            display: "flex",
            flexFlow: "column",
            gap: 2,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </main>
  );
};

export default Layout;
