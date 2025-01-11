import { Box, Typography } from "@mui/material";
import React from "react";
import { gridSxProps } from "../tic-tac-grid/styles";

const PlayerAvatar = ({
  player,
  symbol,
  color,
}: {
  player: any;
  playerNumber: number;
  symbol?: string;
  color?: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "5px",
          ...gridSxProps,
          backgroundColor: color ?? "purple",
        }}
      >
        <Typography variant={"h2"} sx={{ color: "black" }} textAlign={"center"}>
          {symbol ?? player.name?.[0]}
        </Typography>
      </Box>
      <Typography variant={"h3"} textAlign={"center"} color={"error"}>
        {player.name}
      </Typography>
    </Box>
  );
};

export default PlayerAvatar;
