"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export default function useSocket(): Socket | null {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    if (!socket) {
      socket = io("http://192.168.1.73:3001");
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected with socket id:", socket?.id);
      });
      socket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Disconnected from server");
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);
  return isConnected ? socket : null;
}
