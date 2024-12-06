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

export const PUT = async (req: Request) => {
  const { code, userId, assignmentId } = await req.json();
  try {
    await dbConnect();

    // Step 1: Update the submission for the existing user
    const updatedAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId, "submissions.user": userId }, // Match the assignment and specific user
      { $set: { "submissions.$.code": code } }, // Update the code for the matched user
      { new: true }, // Return the updated document
    );

    if (!updatedAssignment) {
      // Step 2: If no submission exists for the user, add a new one
      const newSubmission = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          $push: { submissions: { user: userId, code } },
        },
        { new: true }, // Return the updated document
      );
      console.log("New submission added:", newSubmission);
      return new Response(JSON.stringify({ err: null }), {
        status: 200,
      });
    }

    // console.log("Submission updated:", updatedAssignment);
    return new Response(JSON.stringify({ err: null }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error updating assignment:", err);
    return new Response(JSON.stringify({ err: true }), {
      status: 500,
    });
  }
};
