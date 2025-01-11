import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import {
  rockpaperscissorsImage,
  tictactoeImage,
} from "../../config/assetPaths";
import {
  cardContainerSxProps,
  cardContentSxProps,
  imageContainerSxProps,
  ratingSxProps,
} from "./styles";

const GamesCard = ({
  game,
  selectGame,
  error,
  loading,
}: {
  game: any;
  selectGame: (game: any) => void;
  error?: string;
  loading?: boolean;
}) => {
  const getImagePath = (title: string) => {
    switch (title) {
      case "tic-tac-toe":
        return tictactoeImage;
      case "rock-paper-scissors":
        return rockpaperscissorsImage;
      default:
        return "";
    }
  };

  const isDisabled = (title: string) => {
    return title === "rock-paper-scissors";
  };
  return (
    <Card sx={cardContainerSxProps} raised>
      <CardHeader
        title={
          <Typography
            variant={"h3"}
            textAlign={"center"}
            padding={1}
            gutterBottom
          >
            {game.title}
          </Typography>
        }
        subheader={
          <Typography variant={"body2"} textAlign={"center"}>
            {game.title.toLowerCase() === "rock-paper-scissors" &&
              "Coming Soon"}
          </Typography>
        }
      />
      <CardContent sx={cardContentSxProps}>
        <Box
          sx={imageContainerSxProps(getImagePath(game.title?.toLowerCase()))}
        />
        <FormHelperText error>{error}</FormHelperText>
      </CardContent>
      <CardActions sx={ratingSxProps}>
        <Rating name="read-only" value={game.rating} readOnly />
        <Button
          variant="contained"
          onClick={() => selectGame(game)}
          disabled={isDisabled(game.title?.toLowerCase())}
        >
          {loading ? "Loading..." : "Play >"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GamesCard;
