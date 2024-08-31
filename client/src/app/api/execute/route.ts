import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (typeof code !== "string") {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    const sanitizedCode = code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    // Execute the code
    const { stdout, stderr } = await execPromise(`node -e "${sanitizedCode}"`);

    if (stderr) {
      return NextResponse.json({ stderr: stderr.toString() }, { status: 500 });
    }

    return NextResponse.json({ stdout: stdout.toString() });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
