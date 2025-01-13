import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const GameOverModal = ({ winner, onRestart }) => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <Typography variant={"h4"}>Game Over!</Typography>
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <Typography variant={"h2"}>
          {winner ? "You won" : "You lost"}
        </Typography>
        {winner ? (
          <MoodIcon fontSize={"large"} color={"success"} />
        ) : (
          <SentimentVeryDissatisfiedIcon fontSize={"large"} color={"warning"} />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"primary"} onClick={onRestart}>
          {"Rematch"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
