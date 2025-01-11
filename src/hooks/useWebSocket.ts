import { useRef, useEffect, useState } from "react";
import { webSocketBaseUrl } from "../config/data";

const useWebSocket = ({ callback, clientId }: { callback?: (data: any) => void, clientId: string }) => {
  const ws = useRef<WebSocket | null>(null);
  const intervalRef = useRef<any>(null);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(webSocketBaseUrl!);
      ws.current.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
        sendMessage(JSON.stringify({ clientId }));
      }
      ws.current.onmessage = (message) => {
        console.log("Received:", message.data);
        if (callback) {
          callback(JSON.parse(message.data));
        }
      };
      ws.current.onclose = () => {
        console.log("WebSocket disconnected");
        setConnected(false);
      };
      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
      }
    }
  };

  const disconnect = () => {
    ws.current?.close();
    ws.current = null;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.warn("WebSocket is not open. Message not sent:", message);
    }
  };


  useEffect(() => {
    connect();
    return () => {
      disconnect(); // Ensure cleanup on unmount
      setConnected(false);
    };
  }, [callback]); // Dependency ensures `callback` updates properly

  return { connect, disconnect, sendMessage, connected };
};

export default useWebSocket;
