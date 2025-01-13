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
import GameOverModal from "../../components/game-over-modal";
import GameStats from "../../components/game-stats";

const Game = () => {
  const gameId = window.location.pathname.split("/")[2];
  const serverId = window.location.search.split("=")[1];
  const dispatch = useDispatch<AppDispatch>();
  const { game, server, player, loading } = useSelector(selectGame);
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [gameOverDialog, setGameOverDialog] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gridSymbolAndColors, setGridSymbolAndColors] = useState(() =>
    Array(9).fill({ symbol: "", color: "" })
  );
  const [winners, setWinners] = useState<string[]>([]);

  const timerRef = useRef<any>(null);
  const playerRef = useRef<any>(player);
  const gameSetRef = useRef<any>(null);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    if (server?.winner?.length) {
      const findNames = server?.players?.filter((p: any) =>
        server?.winner?.includes(p.id)
      );
      const names = findNames.map((p: any) => p.name);
      setWinners(names);
    }
  }, [server?.players, server?.winner]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleLiveGame = useCallback(
    (data: any) => {
      handleLiveGameAction(
        data?.grid,
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
    const message = {
      gameId: serverId,
      index,
      clientId: playerRef.current?.id,
    };
    sendMessage(WebSocketMessageType.MARK_GRID, message);
    updateGridByOpponent(message);
  };

  const updateGridByOpponent = useCallback(
    (data: any) => {
      const index = data.index;
      const opponentId = data.clientId;
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

  const handleGameOver = useCallback((data: any) => {
    // Handle win
    const winnerId = data.winner;
    const winner = server?.players?.find((p: any) => p.id === winnerId);
    const isSelf = winner?.id === playerRef.current?.id;
    setIsWon(isSelf);
    setGameOverDialog(true);
  }, [server?.players]);

  const { isConnected: connected, sendMessage } = useWebSocket({
    clientId: playerRef.current?.id ?? player?.id,
    handleTimer: handleTimer,
    handleGridMarked: updateGridByOpponent,
    handleLiveGame: handleLiveGame,
    handleGameOver: handleGameOver,
  });

  const setGame = useCallback(() => {
    const message = {
      gameId: serverId,
    };
    sendMessage(WebSocketMessageType.SET_GAME, message);
    gameSetRef.current = true;
  }, [serverId, sendMessage]);

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
      gameId: serverId,
      clientId: data.id,
    };
    sendMessage(WebSocketMessageType.JOIN_GAME, message);
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
      <GameStats winners={winners} />
      {openModal && (
        <PlayerCreateModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          serverId={serverId}
          callback={callback}
        />
      )}
      {
        gameOverDialog && (
          <GameOverModal
            winner={isWon}
            onRestart={() => {setGameOverDialog(false)}}
          />
        )
      }
    </Container>
  );
};

export default Game;
