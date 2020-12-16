import io from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocketIO = (url: string) => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialise and connect on mount
  useEffect(() => {
    setSocket(io.connect(url, { autoConnect: true }));

    return () => {
      if (socket?.connected) socket.disconnect();
    };
  }, []);

  // Sub to all the events
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
      socket.emit(`server.version`);
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });
    socket.on(`server.version`, (data) => {
      console.log(data);
    });
  }, [socket]);

  return {
    socket,
    socketConnected,
  };
};
