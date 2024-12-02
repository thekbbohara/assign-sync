import { generateAssignment } from "@/lib/geneateAssignment";
export const POST = async (req: Request) => {
  const { GEMINI_API_KEY } = process.env;
  if (!GEMINI_API_KEY)
    return Response.json({ err: true, msg: "Unable to Generate Assignmet." });

  const { prompt } = await req.json();
  console.log({ prompt });
  if (!prompt)
    return Response.json({ err: true, msg: "Please provide prompt." });
  const generatedAssignment = await generateAssignment(GEMINI_API_KEY, prompt);
  console.log(generatedAssignment);

  return Response.json({
    err: false,
    msg: "Assignment Generation Successfull",
    assignment: generatedAssignment,
  });
};
