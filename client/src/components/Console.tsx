"use client";
import useCodeStore from "@/lib/codeStore";
import Header from "./Header";
const Console = () => {
  const { output, setOutput } = useCodeStore();
  const clearConsole = () => {
    setOutput("");
  };
  return (
    <section className="w-full max-w-[420px] bg-[#202124]">
      <div>
        <Header
          title="console"
          btn="clear"
          btnType="outline"
          onBtnClick={clearConsole}
        />
      </div>
      <pre className="w-full px-2 py-2 text-white">
        {output ? output : "run to get the output"}
      </pre>
    </section>
  );
};

export default Console;
