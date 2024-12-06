import dbConnect from "@/lib/dbConnect";
import Assignment, { IAssignment } from "@/model/assignment";

export const POST = async (req: Request) => {
  const assignment = await req.json();
  if (!assignment)
    return Response.json({ err: true, msg: "Unable to save Assignment" });
  try {
    await dbConnect();
    const newAssignmet = new Assignment({ ...assignment });
    // console.log(newAssignmet);
    await newAssignmet.save();
    return Response.json({
      err: null,
      msg: "Assignment Created Successfully.",
    });
  } catch (e) {
    console.log(e);
    return Response.json({ err: true, msg: "Unable to save Assignment" });
  }
};

export const GET = async (req: Request) => {
  const headers = req.headers;
  const id = headers.get("id");
  const user = headers.get("user");
  console.log({ user, id });
  if (!id && !user) {
    return new Response(
      JSON.stringify({
        err: true,
        msg: "Unable to fetch Assignments.",
      }),
    );
  }
  try {
    await dbConnect();
    if (!id) {
      const assignments: IAssignment[] = await Assignment.find({
        "submissions.user": user,
      });
      console.log({ assignments });
      const msg =
        assignments.length >= 1
          ? "Assignment fetched successfully."
          : "No saved assignments.";
      return new Response(
        JSON.stringify({
          err: null,
          msg,
          assignments,
        }),
      );
    }
    const assignment = await Assignment.findById(id);
    // console.log(assignment);
    return Response.json({
      err: null,
      msg: "Assignment fetched successfully.",
      assignment,
    });
  } catch {
    return Response.json({ err: true, msg: "Something went wrong." });
  }
};
