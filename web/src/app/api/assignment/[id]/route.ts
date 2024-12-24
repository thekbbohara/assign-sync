import dbConnect from "@/lib/dbConnect";
import { Assignment, type IAssignment } from "@/model/assignment";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const headers = req.headers;
  const { id } = await params;
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
      // console.log({ assignments });
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
