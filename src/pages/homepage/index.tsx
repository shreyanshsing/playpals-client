import React from "react";
import {Box, Button, Container} from "@mui/material"
import { homepageImage } from "../../config/assetPaths";
import { containerSxProps, HomepageImage } from "./styles";
import { useNavigate } from "react-router";
import { Routes } from "../../router/paths";

const Homepage = () => {

    const navigate = useNavigate();

    const handleRouteToList = () => {
        navigate(Routes.GAME_LIST);
    }
    return (
        <Container sx={containerSxProps}>
            <Box sx={{textAlign: 'center'}}>
                <HomepageImage 
                    src={homepageImage} 
                    alt="homepage"
                />
            </Box>
            <Box>
                <Button variant={'outlined'} onClick={handleRouteToList}>
                    {"Let's Game"}
                </Button>
            </Box>
        </Container>
    )
}

export default Homepage;