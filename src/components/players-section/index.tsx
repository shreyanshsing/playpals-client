import { Grid2, Typography } from "@mui/material";
import { mockPlayer } from "../../utils/mockData";
import PlayerAvatar from "../player-avatar";
import React from "react";

const PlayerSection = ({ players }: { players: any[] }) => {
  return (
    <Grid2
      container
      sx={{
        margin: "2rem auto",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Grid2 size={5}>
        <PlayerAvatar
          player={players?.[0] || mockPlayer}
          color={players?.[0]?.color}
          symbol={players?.[0]?.symbol}
        />
      </Grid2>
      <Grid2 size={2}>
        <Typography
          variant="h2"
          sx={{ color: "black" }}
          textAlign="center"
          gutterBottom
        >
          {" "}
          Vs{" "}
        </Typography>
      </Grid2>
      <Grid2 size={5}>
        <PlayerAvatar
          color={players?.[1]?.color}
          symbol={players?.[1]?.symbol}
          player={players?.[1] || mockPlayer}
        />
      </Grid2>
    </Grid2>
  );
};

export default PlayerSection;
