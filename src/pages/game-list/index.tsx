import { Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchGameList, selectGame, selectGameList } from "./store";
import GamesCard from "../../components/games-card";
import { useNavigate } from "react-router";
import { Routes } from "../../router/paths";
import axios from "axios";
import { serverBaseUrl } from "../../config/data";

const GameList = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { games } = useSelector(selectGameList);
  const [gameServerId, setGameServerId] = useState("");
  const [loading, setLoading] = useState<any>(undefined);
  const [error, setError] = useState("");
  const [gameId, setGameId] = useState("");

  const handleNavigation = useCallback(() => {
    navigate(Routes.GAME + `${gameId}?serverId=${gameServerId}`);
  }, [navigate, gameId, gameServerId]);

  useEffect(() => {
    if (gameServerId && gameId) {
      handleNavigation();
    }
  }, [gameServerId, gameId, handleNavigation]);

  const createGameServer = useCallback(async () => {
    try {
      setLoading(gameId);
      const res = await axios.post(serverBaseUrl + "/game-server", {
        gameId,
      });
      setGameServerId(res.data.id);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(undefined);
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId) {
      createGameServer();
    }
  }, [createGameServer, gameId]);

  const handleSelectGame = (game: any) => {
    dispatch(selectGame(game));
    setGameId(game.id);
  };

  useEffect(() => {
    dispatch(fetchGameList());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Typography
        variant={"h6"}
        textAlign={"center"}
        color={"success"}
        gutterBottom
      >
        {"Available Games"}
      </Typography>
      {games.map((game: any) => (
        <GamesCard
          key={game.id}
          error={error}
          loading={loading}
          game={game}
          selectGame={handleSelectGame}
        />
      ))}
    </Container>
  );
};

export default GameList;
