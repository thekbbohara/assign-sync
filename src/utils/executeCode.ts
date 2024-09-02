export const executeCode = async (
  code: string,
  setOutput: (val: string) => void,
) => {
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
