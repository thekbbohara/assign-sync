import useCodeStore from "@/lib/codeStore";

export const handleEditorChange = (value: string | undefined) => {
  const { setCode } = useCodeStore();
  if (value !== undefined) {
    setCode(value);
  }
};
