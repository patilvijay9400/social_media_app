import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const Toaster = ({ type, msg }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [msg]);

  return (
    <div className="toaster">
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
