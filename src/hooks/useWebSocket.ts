import { useEffect, useRef, useState } from "react";
import { webSocketBaseUrl } from "../config/data";
import { io } from "socket.io-client";
import { WebSocketMessageType } from "../utils/enum";

const useWebSocket = ({
  clientId,
  handleTimer,
  handleGridMarked,
  handleLiveGame,
  handleGameOver,
}: {
  callback?: (data: any) => void;
  clientId: string;
  handleTimer: () => void;
  handleGridMarked: (data: any) => void;
  handleLiveGame: (data: any) => void;
  handleGameOver: (data: any) => void;
}) => {
  const clientIdRef = useRef(clientId);
  const socketRef = useRef(io(webSocketBaseUrl, { autoConnect: false })); // Use autoConnect: false for better control
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = (type: WebSocketMessageType, message: any) => {
    socketRef.current.emit(type, message);
  };

  useEffect(() => {
    const socket = socketRef.current;

    // Connect the socket
    socket.connect();

    // Handle connection event
    const handleConnect = () => {
      setIsConnected(true);
      socket.emit(WebSocketMessageType.CONNECTED, {
        clientId: clientIdRef.current,
      });
    };

    // Handle disconnection event
    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      // Clean up listeners and disconnect the socket
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    socket.on(WebSocketMessageType.GAME_START, handleTimer);
    socket.on(WebSocketMessageType.GRID_MARKED, handleGridMarked);
    socket.on(WebSocketMessageType.GAME_LIVE, handleLiveGame);
    socket.on(WebSocketMessageType.GAME_OVER, handleGameOver);
  }, []);

  return { isConnected, socket: socketRef.current, sendMessage };
};

export default useWebSocket;
