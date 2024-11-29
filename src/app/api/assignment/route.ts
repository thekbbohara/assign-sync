import dbConnect from "@/lib/dbConnect";
import Assignment from "@/model/assignment";

export const POST = async (res: Request) => {
  const assignment = await res.json();
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
