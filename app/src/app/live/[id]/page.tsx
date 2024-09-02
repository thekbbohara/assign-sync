"use client";
import { useEffect, useState } from "react";
import Console from "@/components/Console";
import EditorJs from "@/components/Editor";
import type { Socket } from "socket.io-client";
import useSocket from "@/socket";
import useCodeStore from "@/lib/codeStore";

export default function HomePage() {
  const socket: Socket | null = useSocket();
  // const [code, setCode] = useState<string>("console.log(`hello world`)");
  const { code, setCode, output } = useCodeStore();
  const [outputFromSocket, setOutputFromSocket] = useState<string>(output);
  useEffect(() => {
    if (socket) {
      socket.on("recive_code", (data: string) => {
        setCode(data);
      });
      socket.on("recive_output", (data: string) => {
        setOutputFromSocket(data);
      });
      return () => {
        socket.off("recive_code");
        socket.off("recive_output");
      };
    }
  }, [socket]);
  useEffect(() => {
    if (socket && code) {
      socket.emit("send_code", code);
    }
    return () => {
      if (socket) {
        socket.off("send_code");
      }
    };
  }, [code]);
  useEffect(() => {
    if (socket) {
      socket.emit("send_output", output);
    }
    return () => {
      if (socket) {
        socket.off("send_output");
      }
    };
  }, [socket, output]);
  return (
    <main>
      <section className="relative flex min-h-[100vh]">
        <EditorJs code={code} setCode={setCode} />
        <Console output={outputFromSocket} />
      </section>
    </main>
  );
}
