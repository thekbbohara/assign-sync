"use client";
import Editor from "@monaco-editor/react";
import Header from "./Header";
import useCodeStore from "@/lib/codeStore";
import { executeCode } from "@/utils/executeCode";
const EditorJs = ({
  code,
  setCode,
}: {
  code: string;
  setCode: (value: string) => void;
}) => {
  const { setOutput } = useCodeStore();
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    } else {
      setCode("");
    }
  };
  return (
    <section
      onKeyDown={async (e) => {
        if (e.altKey && e.key == "Enter") {
          await executeCode(code, setOutput);
        }
      }}
      className="w-full bg-[#1e1e1e]"
    >
      <div>
        <Header
          className="border-r-2 border-[#1e1e1e] pl-10"
          title="Assignment name"
          btn="run"
          onBtnClick={async () => {
            setOutput("Loading...");
            await executeCode(code, setOutput);
          }}
        />
      </div>
      <div className="py-2">
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
