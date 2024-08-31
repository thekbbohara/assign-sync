import { create } from "zustand";

interface codeState {
  code: string;
  setCode: (newCode: string) => void;
  output: string;
  setOutput: (newOutput: string) => void;
}

const useCodeStore = create<codeState>()((set) => ({
  code: 'console.log("jainam gand mara")',
  setCode: (newCode: string) => set({ code: newCode }),
  output: "",
  setOutput: (newOutput: string) => set({ output: newOutput }),
}));

export default useCodeStore;
