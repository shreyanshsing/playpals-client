import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Box>
      <Button
        variant={"contained"}
        color={!copied ? "primary" : "success"}
        onClick={handleCopy}
        fullWidth
      >
        {!copied ? "Copy Link" : "Copied"}
      </Button>
      <Typography
        variant={"body2"}
        sx={{ color: "black", margin: "1rem" }}
        textAlign={"center"}
      >
        Share this link with your friend to play
      </Typography>
    </Box>
  );
};

export default CopyLinkButton;
