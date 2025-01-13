import React from "react";
import { Box, Typography } from "@mui/material";

const GameStats = ({winners}: {winners: string[]}) => {
    return (
        <Box sx={{textAlign: "center", border: 1, borderRadius: 1, padding: 1}}>
            <Typography variant={"h3"} color={'black'}>Game Stats</Typography>
            <Typography variant={"h6"}>Winners</Typography>
            <Box sx={{display: "flex", flexDirection: "row", gap: 1, width: "80%", margin: "auto", overflowX: "auto"}}>
                {winners.map((winner, index) => (
                    <Typography key={index}>{winner}</Typography>
                ))}
            </Box>
        </Box>
    );
};

export default GameStats;