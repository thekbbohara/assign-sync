"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useSocket from "@/socket";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const socket: Socket | null = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("recive_code", (data: string) => {
        setCode(data);
      });
      // Clean up the listener on unmount
      return () => {
        socket.off("recive_code");
      };
    }
  }, [socket]);

  return (
    <main>
      <textarea
        value={code}
        onChange={(e) => {
          if (socket) {
            socket.emit("send_code", e.target.value);
          }
          setCode(e.target.value);
        }}
      ></textarea>
    </main>
  );
}
