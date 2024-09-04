"use client";
import Console from "@/components/Console";
import EditorJs from "@/components/Editor";
import useCodeStore from "@/lib/codeStore";
import React from "react";

const create = () => {
  const { code, setCode, output } = useCodeStore();
  return (
    <main className="relative flex min-h-[100vh]">
      <EditorJs code={code} setCode={setCode} />
      <Console output={output} />
    </main>
  );
};

export default create;
