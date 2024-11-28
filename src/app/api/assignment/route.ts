import Assignment from "@/model/assignment";

export const POST = async (res: Request) => {
  const assignment = await res.json();
  const newAssignmet = new Assignment({ ...assignment });
  console.log(newAssignmet);
  try {
    await newAssignmet.save();
  } catch {
    return Response.json({ err: "Unable to save Assignment" });
  }
  return Response.json({ err: null });
};
