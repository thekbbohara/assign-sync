"use client";
import Editor from "@monaco-editor/react";
import Header from "./Header";
import useCodeStore from "@/lib/codeStore";

const EditorJs = () => {
  const { code, setCode, setOutput } = useCodeStore();
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };
  const executeCode = async () => {
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`,
        );
      }

      const data = await response.json();

      if (data.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput(data.stdout);
      }
    } catch (err: any) {
      setOutput(err.message || "An unexpected error occurred.");
    }
  };
  return (
    <section className="w-full bg-[#1e1e1e]">
      <div>
        <Header
          className="border-r-2 border-[#1e1e1e] pl-10"
          title="Assignment name"
          btn="run"
          onBtnClick={async () => {
            setOutput("Loading...");
            await executeCode();
          }}
        />
      </div>
      <div
        onKeyDown={(e) => {
          if (e.altKey && e.key == "Enter") {
            async () => {
              await executeCode();
            };
          }
        }}
        className="py-2"
      >
        <Editor
          theme="vs-dark"
          className="w-full bg-red-500"
          height={"100vh"}
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
        />
      </div>
    </section>
  );
};

export default EditorJs;
