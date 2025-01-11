import { Button, Container, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchGame, fetchServer, selectGame, selectPlayer } from "./store";
import PlayerCreateModal from "../../components/player-create-modal";
import { mockPlayer } from "../../utils/mockData";
import GameRules from "../../components/game-rules";
import PlayerSection from "../../components/players-section";
import useWebSocket from "../../hooks/useWebSocket";
import TicTacGrid from "../../components/tic-tac-grid";
import CopyLinkButton from "../../components/copy-link-button";
import { WebSocketMessageType } from "../../utils/enum";
import { handleLiveGameAction } from "./webSocketActions";

const Game = () => {
  const gameId = window.location.pathname.split("/")[2];
  const serverId = window.location.search.split("=")[1];
  const dispatch = useDispatch<AppDispatch>();
  const { game, server, player, loading } = useSelector(selectGame);
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [gridSymbolAndColors, setGridSymbolAndColors] = useState(() =>
    Array(9).fill({ symbol: "", color: "" })
  );
  const timerRef = useRef<any>(null);
  const playerRef = useRef<any>(player);
  const gameSetRef = useRef<any>(null);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleLiveGame = useCallback(
    (grid: any) => {
      handleLiveGameAction(
        grid,
        gridSymbolAndColors,
        server?.players,
        setGridSymbolAndColors
      );
      timerRef.current = null;
      setTimer(0);
    },
    [gridSymbolAndColors, server?.players]
  );

  const handleTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimer(5); // Reset timer
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          dispatch(fetchServer(serverId));
          return 0; // Stop at 0
        }
        return prev - 1; // Decrement timer
      });
    }, 1000); // Decrease timer every second
  }, [dispatch, serverId]);

  const handleMark = (index: number) => {
    if (!playerRef.current || gridSymbolAndColors[index].symbol || !connected) {
      return;
    }
    console.log("Marking index: ", index);
    const message = {
      type: WebSocketMessageType.MARK_GRID,
      gameId: serverId,
      index,
      clientId: playerRef.current?.id,
    };
    sendMessage(JSON.stringify(message));
    updateGridByOpponent(index, playerRef.current?.id);
  };

  const updateGridByOpponent = useCallback(
    (index: number, opponentId: string) => {
      const opponent = server?.players?.find((p: any) => p.id === opponentId);
      const symbol = opponent?.symbol;
      const color = opponent?.color;
      setGridSymbolAndColors((prev) => {
        const newGrid = [...prev];
        newGrid[index] = { symbol, color };
        return newGrid;
      });
    },
    [server?.players]
  );

  const handleMessage = useCallback(
    (data: any) => {
      console.log("data: ", data);
      const type = data.type;
      if (type === WebSocketMessageType.GAME_START) {
        handleTimer();
      } else if (type === WebSocketMessageType.GRID_MARKED) {
        const index = data.index;
        updateGridByOpponent(index, data.clientId);
      } else if (type === WebSocketMessageType.GAME_LIVE) {
        handleLiveGame(data.grid);
      }
    },
    [handleLiveGame, handleTimer, updateGridByOpponent]
  );

  const { sendMessage, connected } = useWebSocket({
    callback: handleMessage,
    clientId: playerRef.current?.id ?? player?.id,
  });

  const setGame = useCallback(() => {
    const message = {
      type: WebSocketMessageType.SET_GAME,
      gameId: serverId,
    };
    console.log("Sending:", message);
    sendMessage(JSON.stringify(message));
    gameSetRef.current = true;
  }, [serverId, sendMessage]);

  console.log("isConnected: ", connected);

  useEffect(() => {
    if (connected && !gameSetRef.current) {
      setGame();
    }
  }, [connected, setGame]);

  const shouldOpenModal = useMemo(() => {
    if (!loading && server?.players?.length === 0) {
      return true;
    }

    const alreadyJoined = server?.players?.find(
      (p: any) => p.id === playerRef.current?.id
    );
    return !alreadyJoined;
  }, [loading, server?.players]);

  useEffect(() => {
    if (shouldOpenModal) {
      setOpenModal(true);
    }
  }, [shouldOpenModal]);

  useEffect(() => {
    if (gameId && !game) {
      dispatch(fetchGame(gameId));
    }
  }, [dispatch, game, gameId]);

  useEffect(() => {
    if (serverId) {
      dispatch(fetchServer(serverId));
    }
  }, [dispatch, serverId]);

  const callback = (data: any) => {
    dispatch(selectPlayer(data));
    const message = {
      type: WebSocketMessageType.JOIN_GAME,
      gameId: serverId,
      clientId: data.id,
    };
    console.log("Joining as new client:", message);
    sendMessage(JSON.stringify(message));
  };

  const getLinkButton = () => {
    return timer === 5 && <CopyLinkButton />;
  };

  const getStateGameButton = () => {
    return (
      timer <= 5 &&
      timer > 0 && (
        <Button variant={"outlined"} color={"primary"} fullWidth>
          {`Starting in ${timer} seconds`}
        </Button>
      )
    );
  };

  return (
    <Container>
      <Header />
      <Typography variant="h3" textAlign="center" gutterBottom>
        {game?.title}
      </Typography>
      {timer > 0 ? (
        <GameRules rules={game?.rules} />
      ) : (
        <TicTacGrid
          mark={handleMark}
          gridSymbolAndColors={gridSymbolAndColors}
        />
      )}
      <PlayerSection players={server?.players || [mockPlayer, mockPlayer]} />
      {getLinkButton()}
      {getStateGameButton()}
      {openModal && (
        <PlayerCreateModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          serverId={serverId}
          callback={callback}
        />
      )}
    </Container>
  );
};

export default Game;
