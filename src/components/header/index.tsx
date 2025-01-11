import { Box } from "@mui/material";
import React from "react";
import { logoImage } from "../../config/assetPaths";

const Header = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-2rem" }}>
            <img src={logoImage} alt="logo" />
        </Box>
    )
}

export default Header;