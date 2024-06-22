import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import useFetchAPIs from "../../hooks/useFetchAPIs";

const Alerts = () => {
  const { openAlert, setOpenAlert } = useFetchAPIs();

  const genericErrorMsg =
    "The application has encountered an unknown error. It doesn't appear to have affected your data, but our technical staff have been automatically notified and will be looking into this with the utmost urgency.";

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {genericErrorMsg}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Alerts;
