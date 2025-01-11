import { Grid2, Typography } from "@mui/material";
import { mockPlayer } from "../../utils/mockData";
import PlayerAvatar from "../player-avatar";
import React from "react";
import { useSelector } from "react-redux";
import { selectGame } from "../../pages/game/store";

const PlayerSection = ({ players }: { players: any[] }) => {
  const {player} = useSelector(selectGame);

  const isOwner = player?.id === players[0]?.id;
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
          playerNumber={isOwner ? null : 1}
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
          playerNumber={isOwner ? null : 2}
        />
      </Grid2>
    </Grid2>
  );
};

export default PlayerSection;
